/*
<div :class="c" class="demo" v-if="isShow">
    <span v-for="item in sz">{{item}}</span>
</div>
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
const endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>')

const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g

const forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/



// 将已经解析的html给去掉
function advance (n) {
  index += n
  html = html.substring(n)
}

// 解析html
function parseHTML (html) {
  while (html) {
    // 匹配tag '<'开始标签, 否则就是文本
    let tagIndex = html.indexOf('<')
    // 如果第一个，这是标签
    if (tagIndex === 0) {
      // 匹配结束标签
      if (html.match(endTag)) {
        console.log('endtag', endTag)
        const endTag = html.match(endTag)
        if (endTag) {
          advance(endTag[0].length)
          parseEndTag(endTag[1])
          continue
        }
      }
      // 匹配开始标签
      if (html.match(startTagOpen)) {
        const startTag = parseStartTag()
        console.log('startTag', startTag)
        const element = {
          type: 1,
          tag: startTag.name,
          lowerCasedTag: startTag.name.toLowerCase(),
          arrtsList: startTag.attrs,
          attrsMap: makeAttrsMap(startTag.attrs),
          parent: currentParent,
          children: []
        }

        // 处理v-if v-for
        processIf(element)
        processFor(element)

        if (!root) {
          root = element
        }
        if (currentParent) {
          currentParent.children.element
        }
        stack.psuh(element)
        currentParent = element
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
}

// 解析开始标签
function parseStartTag() {
  const start = html.match(startTagOpen)
  console.log(start)
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
      advance(end(0).length)
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
    console.log('textmatch', match)
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
// 将attr数组转成对象
function makeAttrsMap () {
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
// 处理v-for
function processFor (el) {
  let expression = getAndRemoveAttr(el, 'v-for') 

  if (expression) {
    const inMatch = expression.match(forAliasRE)
    console.log(inMatch)
    el.for = inMatch[2].trim()
    el.alias = inMatch[1].trim()
  }
}
// 处理v-if
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