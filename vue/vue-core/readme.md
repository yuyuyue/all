## vue.js技术揭秘学习


flow 识别变量类型

### 源码目录和基本构建
目录

src
├── compiler        # 编译相关 
├── core            # 核心代码 
├── platforms       # 不同平台的支持
├── server          # 服务端渲染
├── sfc             # .vue 文件解析
├── shared          # 共享代码

构建
{
  "script": {
    "build": "node scripts/build.js",
    "build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",
    "build:weex": "npm run build -- weex"
  }
}

通过执行npm run build, 运行build.js文件 构建vue

```build.js
let builds = require('./config').getAllBuilds()

// filter builds via command line arg
if (process.argv[2]) {
  const filters = process.argv[2].split(',')
  builds = builds.filter(b => {
    return filters.some(f => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1)
  })
} else {
  // filter out weex builds by default
  builds = builds.filter(b => {
    return b.output.file.indexOf('weex') === -1
  })
}

build(builds)
```


Vue 的最基本形态
```javascript
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```
通过一个function来构建vue， 所以我们是new Vue， 使用function可以通过prototype原型进行扩展

initGlobalAPI 初始化全局方法



### 数据驱动
数据驱动:视图是由数据驱动生成的，我们对视图的修改，不会直接操作 DOM，而是通过修改数据

当进行new vue 时，会进行初始化
```
initLifecycle(vm)
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')
```


- $mount
首先将原型的mount进行缓存
```mount
// public mount method
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```
判断是否为body或者html

如果render方法没有定义则，el或者template通过compileToFunctions 转化为render方法，vue2.0的数据渲染都是通过render来实现


$mount 通过mountComponent 来进行挂载
核心就是先实例化一个渲染Watcher，在它的回调函数中会调用 updateComponent 方法，在此方法中调用 vm._render 方法先生成虚拟 Node，最终调用 vm._update 更新 DOM。


- _render
初始化重置插槽 ，存在父节点则将vnode设为父节点
不存在则创建一个空的虚拟node

在HTML中render(createElement) {}

在_render中vnode = render.call(vm._renderProxy, vm.$createElement)
在initrender中
vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)

- vnode虚拟Dom src/core/vdom/vnode.js
真实dom非常庞大 
```
var div = document.createElement('div')
var str = ''
for (var key in div) {
  str += key + ''
}
```

生成虚拟node后，需要通过 create、diff、patch 等过程

- createElement src/core/vdom/create-elemenet.js

