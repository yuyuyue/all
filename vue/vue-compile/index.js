/*将html
<div :class="c" class="demo" v-if="isShow">
    <span v-for="item in sz">{{item}}</span>
</div>
编译成AST
*/

var html = '<div :class="c" class="demo" v-if="isShow"><span v-for="item in sz">{{item}}</span></div>'
var index = 0
var root = {}
var currentParent = {}
var stack = []

// 用于匹配字符窜的正则
const ncname = '[a-zA-Z_][\\w\\-\\.]*'
const singleAttrIdentifier = /([^\s"'<>/=]+)/
const singleAttrAssign = /(?:=)/
const singleAttrValues = [
  /"([^"]*)"+/.source,
  /'([^']*)'+/.source,
  /([^\s"'=<>`]+)/.source
]
const attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
)

const qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')'
const startTagOpen = new RegExp('^<' + qnameCapture)
const startTagClose = /^\s*(\/?)>/

// 匹配以'</'开头
const endTags = new RegExp('^<\\/' + qnameCapture + '[^>]*>')

const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g

const forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/



// 将已经解析的html给去掉
function advance (n) {
  index += n
  html = html.substring(n)
}

// 将attr数组转成对象
function makeAttrsMap (attrs) {
  const map = {}
  for (let i = 0, length = attrs.length; i < length; i++) {
    map[attrs[i].name] = attrs[i].value
  }
  return map
}

// 取出attrs的值
function getAndRemoveAttr (el, name) {
  let val = el.attrsMap[name]
  if (val != null) {
    return val
  }
}


// 解析开始标签
function parseStartTag() {
  const start = html.match(startTagOpen)
  console.log('-------------start------------', start)
  if (start) {
    const match = {
      tag: start[1],
      attrs: [],
      start: index
    }
    advance(start[0].length)

    let end,attr
    // 匹配attr
    while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
      advance(attr[0].length)
      match.attrs.push({
        name: attr[1],
        value: attr[3]
      })
    }
    // 标签结束
    if (end) {
      match.unarySlash = end[1]
      advance(end[0].length)
      match.end = index
      return match
    }
  }
}

// 解析结束标签
function parseEndTag (name) {
  let pos
  for (pos = stack.length - 1; pos >= 0; pos--) {
    // 闭合标签匹配
    if (stack[pos].lowerCasedTag === name.toLowerCase()) {
      break
    }
    // 出栈
    if (pos >= 0) {
      stack.length = pos
      currentParent = stack[pos]
    }
  }
}

// 解析文本
function parseText(text) {
  // 使用test会将正则的lastIndex改变
  if (!defaultTagRE.test(text)) {
    return
  }
  const tokens = []
  // 重置lastIndex
  let lastIndex = defaultTagRE.lastIndex = 0
  let match,index
  while ((match = defaultTagRE.exec(text))) {
    console.log('-------------textmatch------------', match)
    index = match.index
    // 有空格|或者不是双大括号插值的文本 (正常文本)
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)))
    }
    const expression = match[1].trim()
    tokens.push(`_s(${expression})`)
    lastIndex = index + match[0].length
  }
  // 插值后的正常文本
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)))
  }
  return tokens.join('+')
} 

// 提炼v-for
function processFor (el) {
  let expression = getAndRemoveAttr(el, 'v-for') 

  if (expression) {
    const inMatch = expression.match(forAliasRE)
    console.log('-------------inMatch------------', inMatch)
    el.for = inMatch[2].trim()
    el.alias = inMatch[1].trim()
  }
}

// 提炼v-if
function processIf (el) {
  let expression = getAndRemoveAttr(el, 'v-if')

  if (expression) {
    // 储存if条件
    if (!el.ifConditions) {
      el.ifConditions = []
    }
    el.ifConditions.push({
      expression,
      block: el
    })
  }
}

// 解析html
function parseHTML () {
  while (html) {
    // 匹配tag '<'开始标签, 否则就是文本
    let tagIndex = html.indexOf('<')
    // 如果第一个，这是标签
    if (tagIndex === 0) {
      // 匹配结束标签
      if (html.match(endTags)) {
        const endTag = html.match(endTags)
        console.log('-------------endTag------------', endTag)
        if (endTag) {
          advance(endTag[0].length)
          parseEndTag(endTag[1])
          continue
        }
      }
      // 匹配开始标签
      if (html.match(startTagOpen)) {
        const startTag = parseStartTag()
        console.log('-------------startTag------------', startTag)
        const el = {
          type: 1,
          tag: startTag.tag,
          lowerCasedTag: startTag.tag.toLowerCase(),
          arrtsList: startTag.attrs,
          attrsMap: makeAttrsMap(startTag.attrs),
          parent: currentParent,
          children: []
        }
        // 处理v-if v-for
        processIf(el)
        processFor(el)
        console.log('------------el-----------------', el)
        if (!Object.keys(root).length) {
          root = el
        }
        if (Object.keys(currentParent).length) {
          console.log('-------currentParent------------',currentParent)
          currentParent.children.push(el)
        }
        // 单标签
        if (!startTag.unarySlash) {
          stack.push(el)
          currentParent = el
        }
        continue
      }
    } else { 
      // 匹配文本
      let text = html.substring(0, tagIndex)
      advance(tagIndex)
      // 如果是有插值的
      let expression
      if (expression = parseText(text)) {
        currentParent.children.push({
          type: 2,
          text,
          expression
        })
      } else {
        currentParent.children.push({
          type: 3,
          text
        })
      }
      continue
    }
  }
  return root
}

function parse () {
  return parseHTML()
}

// 判断是否是静态的
function isStatic (node) {
  if (node.type === 2) {
    return false
  } 
  if (node.type === 3) {
    return true
  }
  return (!node.if && !node.for)
}

// 标记静态的节点
function markStatic (node) {
  node.static = isStatic(node)
  if (node.type === 1 && node.children.length > 0) {
    node.children.map(child => {
      // 递归子节点树，并判断子节点是否是静态的
      markStatic(child)
      // 不是静态的，父节点也不是静态的
      if (!child.static) {
        node.static = false
      }
    })
  } 
}

// 标记静态根节点
function markStaticRoots (node) {
  if (node.type === 1) {
    console.log('---------node.children-------',node.children)
    let typeLength = node.children.map(child => child.type === 3).length
    if (node.static && node.children.length > 1 && typeLength > 1) {
      node.staticRoot = true
      return
    } else {
      node.staticRoot = false
    }
  }
}

// 优化解析html，不会解析静态的html
function optimize (rootAst) {
  markStatic(rootAst)
  markStaticRoots(rootAst)
}


// 判断节点类型
function genNode (el) {
  // type 1 元素节点 2 插值文本 3 纯文本
  if (el.type === 1) {
    return genElement(el)
  } else {
    return genText(el)
  }
}
// 除了子元素节点，循环，然后方法相同
function genChildren (el) {
  const children = el.children

  if (children && children.length > 0) {
    return `${children.map(genNode).join(',')}`
  }
}
// 处理节点 
function genElement (el) {
  if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.for && !el.forProcessed) {
    return genFor(el)
  } else {
    const children = genChildren(el)
    let code
    code = `_c('${el.tag},'{
        staticClass: ${el.attrsMap && el.attrsMap[':class']},
        class: ${el.attrsMap && el.attrsMap['class']},
    }${
        children ? `,${children}` : ''
    })`
    return code
  }
}
// 处理if节点 
function genIf (el) {
  el.ifProcessed = true
  if (!el.ifConditions.length) {
    return '_e()'
  }
  return `(${el.ifConditions[0].expression}?${genElement(el.ifConditions[0].block)}: _e())`
}
// 处理for节点
function genFor (el) {
  el.forProcessed = true

  const exp = el.for
  const alias = el.alias
  const iterator1 = el.iterator1 ? `,${el.iterator1}` : ''
  const iterator2 = el.iterator2 ? `,${el.iterator2}` : ''

  return `_l((${exp}),` +
      `function(${alias}${iterator1}${iterator2}){` +
      `return ${genElement(el)}` +
  '})'
}
// 处理文本节点节点
function genText (el) {
  return `_v(${el.expression})`
}
// 将AST进行render
function generate (rootAst) {
  const code = rootAst ? genElement(rootAst) : '_c("div")'
  return {
    render: `with(this){return ${code}}`
  }
}

const ast = parse()
optimize(ast)
const code = generate(ast)
console.log('-------------code------------', code)