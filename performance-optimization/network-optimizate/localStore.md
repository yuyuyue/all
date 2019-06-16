### 本地存储

#### Cookie
用户信息,用户信息 账号密码等

Set-Cookie: name=xiuyan; domain=xiuyan.me

cookie 只有4kb,提交小

#### web Storage
HTML5 专门为浏览器存储而提供的数据存储机制。它又分为 Local Storage 与 Session Storage

- Local Storage是持久化的本地存储，存储在其中的数据是永远不会过期的，使其消失的唯一办法是手动删除, 并且在一个域名下是共享的

-  Session Storage 是临时性的本地存储，它是会话级别的存储，当会话结束（页面被关闭）时，存储内容也随之被释放，在不同页面session是不共享的

#### IndexedDB
IndexedDB 是一个运行在浏览器上的非关系型数据库，一般来说不会小于 250M
```javascript
// 1 打开/创建一个 IndexedDB 数据库（当该数据库不存在时，open 方法会直接创建一个名为 xiaoceDB 新数据库)
// 后面的回调中，我们可以通过event.target.result拿到数据库实例
let db
// 参数1位数据库名，参数2为版本号
const request = window.indexedDB.open("xiaoceDB", 1)
// 使用IndexedDB失败时的监听函数
request.onerror = function(event) {
    console.log('无法使用IndexedDB')
  }
// 成功
request.onsuccess  = function(event){
  // 此处就可以获取到db实例
  db = event.target.result
  console.log("你打开了IndexedDB")
}
// 2 创建一个 object store（object store 对标到数据库中的“表”单位）。
// onupgradeneeded事件会在初始化数据库/版本发生更新时被调用，我们在它的监听函数中创建object store
request.onupgradeneeded = function(event){
  let objectStore
  // 如果同名表未被创建过，则新建test表
  if (!db.objectStoreNames.contains('test')) {
    objectStore = db.createObjectStore('test', { keyPath: 'id' })
  }
}  
// 3 构建一个事务来执行一些数据库操作，像增加或提取数据等。
// 创建事务，指定表格名称和读写权限
  const transaction = db.transaction(["test"],"readwrite")
  // 拿到Object Store对象
  const objectStore = transaction.objectStore("test")
  // 向表格写入数据
  objectStore.add({id: 1, name: 'xiuyan'})
// 4 通过监听正确类型的事件以等待操作完成。
  // 操作成功时的监听函数
  transaction.oncomplete = function(event) {
    console.log("操作成功")
  }
  // 操作失败时的监听函数
  transaction.onerror = function(event) {
    console.log("这里有一个Error")
  }
  
```