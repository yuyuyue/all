// 入口， 进行diffpatch
function patch(oldVNode, vnode, parentElm) {
  // 不存在旧的node，将新的node直接插入父节点
  if (!oldVnode) {
    addVnodes(parentElm, null, vnode, 0, vnode.length - 1)
  } else if (!vnode) { // 不存在新的node，移除就的节点
    removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1)
  } else {
    // 存在切相同 
    if (sameVnode(oldVNode, vnode)) {
      patchVnode(oldVNode, vnode)
    } else {
      // 存在不同，将新节点替换久节点
      removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1)
      addVnodes(parentElm, null, vnode, 0, vnode.length - 1)
    }
  }
}
// 相同节点的比较
function patchVnode(oldVnode, vnode) {
  // 完成相同，直接返回
  if (oldVnode === vnode) {
    return
  }
  // 静态的节点，直接替换
  if (vnode.isStatic && oldVnode.isStatic && vnode.key === oldVnode.key) {
    vnode.elm = oldVnode.elm
    vnode.componentInstance = oldVnode.componentInstance
    return
  }

  // 判断子节点
  const elm = vnode.elm = oldVnode.elm
  const oldCh = oldVnode.children
  const ch = vnode.children

  // 是文本节点，直接替换
  if (vnode.text) {
    nodeOps.setTextContent(elm, vnode.text)
  } else {
    if (oldCh && ch) { //同时存在
      if (oldCh !== ch) { // 不相同，更新子节点
        updateChildren(elm, oldCh, ch)
      }
    } else if (ch) { 
      if (oldVnode.text) nodeOps.setTextContent(elm, '')
      addVnodes(elm, null, ch, 0, ch.length - 1)
    } else if (oldCh) {
      removeVnodes(elm, oldCh, 0, oldCh.length - 1)
    } else if (oldVnode.text) {
      nodeOps.setTextContent(elm, '')
    }
  }
}
// 判断input的类型
function sameInputType(a, b) {
  if (a.tag !== 'input') return true
  let i
  const typeA = (i = a.data) && (i = i.attrs) && i.type
  const typeB = (i = b.data) && (i = i.attrs) && i.type
  return typeA === typeB
}
// 判断相同的node
function sameVnode() {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    !!a.data === !!b.data &&
    sameInputType(a, b)
  )
}
// 将el插入到parent中
function insert(parent, elm, ref) {
  if (parent) {
    // 如果是ref 
    if (ref) {
      if (ref.parentNode === parent) {
        nodeOps.insertBefore(parent, elm, ref)
      }
    } else {
      nodeOps.appendChild(parent, elm)
    }
  }
}
// 创建元素
function createElm(vnode, parentElm, refElm) {
  if (vnode.tag) {
    insert(parentElm, nodeOps.createElement(vnode.tag), refElm)
  } else {
    insert(parentElm, nodeOps.createTextNode(vnode.text), refElm)
  }
}
// 批量添加node
function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    createElm(vnodes[startIdx], parentElm, refElm)
  }
}
// 移除node
function removeNode(el) {
  const parent = nodeOps.parentNode(el)
  if (parent) {
    nodeOps.removeChild(parent, el)
  }
}
// 批量移除node
function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx]
    if (ch) {
      removeNode(ch.elm)
    }
  }
}
// 将key map 转变成数组
function createKeyToOldIdx(children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}
// 更新子节点
function updateChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0 // 旧节点开始
  let newStartIdx = 0 //  
  let oldEndIdx = oldCh.length - 1
  let oldStartVnode = oldCh[0]
  let oldEndVnode = oldCh[oldEndIdx] // 旧节点的node， 与index同步
  let newEndIdx = newCh.length - 1
  let newStartVnode = newCh[0]
  let newEndVnode = newCh[newEndIdx]
  let oldKeyToIdx, idxInOld, elmToMove, refElm

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 旧节点不存在，直接替换
    if (!oldStartVnode) {
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (!oldEndVnode) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (sameVnode(oldStartVnode, newStartVnode)) {  // 新旧相同的四种情况
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode)
      nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode)
      nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else { //新旧不相同
      let elmToMove = oldCh[idxInOld]
      if (!oldKeyToIdx) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)  // 把旧节点的key转成数组，方便查找
      idxInOld = newStartVnode.key ? oldKeyToIdx[newStartVnode.key] : null 
      if (!idxInOld) { // 存在和新node相同的key
        createElm(newStartVnode, parentElm)
        newStartVnode = newCh[++newStartIdx]
      } else {
        elmToMove = oldCh[idxInOld]
        if (sameVnode(elmToMove, newStartVnode)) { // 完全相同，直接替换
          patchVnode(elmToMove, newStartVnode)
          oldCh[idxInOld] = undefined // 防止重复
          nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm)
          newStartVnode = newCh[++newStartIdx]
        } else { //不相同，创建新node， 插入
          createElm(newStartVnode, parentElm)
          newStartVnode = newCh[++newStartIdx]
        }
      }
    }
  }

  if (oldStartIdx > oldEndIdx) { // 新node多，直接插入
    refElm = (newCh[newEndIdx + 1]) ? newCh[newEndIdx + 1].elm : null
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx)
  } else if (newStartIdx > newEndIdx) { // 旧node多直接删除
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
  }
}

// 封装多平台node api
const nodeOps = {
  // 文本节点设置文本
  setTextContent() {

  },
  parentNode() {

  },
  removeChild() {

  },
  nextSibling() {

  },
  insertBefore() {

  }
}