### vue-compile 将html编译成AST在将其转成render function渲染

- parse 编译 编译为虚拟node
- optimize 优化 不解析静态节点
- generate 生成 AST

#### parse
`parseHtml`通过正则解析html，其中有以下几种情况
- parseStartTag 解析开始标签
- parseEndTag 解析结束标签
- parseText 解析文本标签


`parseStartTag` 最核心，
如果是开始标签，将<>开始标签内的属性，标签名等信息解析，用el对象接受匹配的标签的属性，并且处理v-for v-if等vue的特殊的属性


`parseEndTag` 匹配到结束标签，将结束标签对应的开始标签出栈

`parseText` 匹配文本标签包普通文本和插值文本


#### optimize
`markStatic` 如果该节点和其子节点都是静态的，则标记为静态的

`isStatic` 根据节点type来判断是否为静态 type 1 元素节点 2 插值文本 3 纯文本


#### generate
