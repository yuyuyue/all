### 缓存类型
1. Memory Cache 内存中的缓存
2. Service Worker Cache 主线程之外的 Javascript 线程进行的缓存
3. HTTP Cache HTTP中的缓存
4. Push Cache HTTP2 在 server push 阶段存在的缓存

#### HTTP cache
分为强缓存和协议缓存
优先级较高的是强缓存，在命中强缓存失败的情况下，才会走协商缓存。

- 强缓存(disk cache)是利用http 头中的 Expires(为了向下兼容) 和 Cache-Control * 两个字段来控制的

Expires 写入一个缓存时间戳


cache-control: max-age=31536000 , s-maxage=31536000 
max-age 客户端写入最大存活时间
s-maxage 缓存服务器的最大存活时间

> public与private(默认) 是针对资源是否能够被代理服务缓存而存在的一组对立概念 
> no-store与no-cache no-cache 绕开了浏览器 no-store 比较绝情，顾名思义就是不使用任何缓存策略

- 协商缓存：浏览器与服务器合作之下的缓存策略

通过 Last-Modified 和 Etag 
Last-Modified: Fri, 27 Oct 2017 06:35:57 GMT
缺点 
1. 我们编辑了文件，但文件的内容没有改变,也会请求缓存
2. 小于1s的修改操作无法被检测


Etag 是由服务器为每个资源生成的唯一的标识字符串

ETag: W/"2a3b-1602480f459"
If-None-Match: W/"2a3b-1602480f459"
Etag 的生成过程需要服务器额外付出开销，它只能作为 Last-Modified 的补充和强化存在，会影响服务端的性能，Etag 在感知文件变化上比 Last-Modified 更加准确，优先级也更高。当 Etag 和 Last-Modified 同时存在时，以 Etag 为准。


#### MemoryCache
内存中的缓存,优先级上最高,响应最快,寿命短, 一般base64的图片会存入

#### Service Worker Cache
它脱离于浏览器窗体，因此无法直接访问 DOM。，这个“幕后工作者”可以帮我们实现离线缓存、消息推送和网络代理等功能。

> Service Worker 的生命周期包括 install、active、working 三个阶段。一旦 Service Worker 被 install，它将始终存在，只会在 active 与 working 之间切换，除非我们主动终止它。这是它可以用来实现离线存储的重要先决条件。

Service Worker 进行缓存的方法
```javascript
// 首先调用api启用test.js的serviceWorker
window.navigator.serviceWorker
  .register('/test.js')
  .then(function () {
    console.log('注册成功')
  }).catch(err => {
    console.error("注册失败")
  })
// Service Worker会监听 install事件，我们在其对应的回调里可以实现初始化的逻辑  
self.addEventListener('install', event => {
  event.waitUntil(
    // 考虑到缓存也需要更新，open内传入的参数为缓存的版本号
    caches.open('test-v1').then(cache => {
      return cache.addAll([
        // 此处传入指定的需缓存的文件名
        '/test.html',
        '/test.css',
        '/test.js'
      ])
    })
  )
})

// Service Worker会监听所有的网络请求，网络请求的产生触发的是fetch事件，我们可以在其对应的监听函数中实现对请求的拦截，进而判断是否有对应到该请求的缓存，实现从Service Worker中取到缓存的目的
self.addEventListener('fetch', event => {
  event.respondWith(
    // 尝试匹配该请求对应的缓存值
    caches.match(event.request).then(res => {
      // 如果匹配到了，调用Server Worker缓存
      if (res) {
        return res
      }
      // 如果没匹配到，向服务端发起这个资源请求
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) {
          return response
        }
        // 请求成功的话，将请求缓存起来。
        caches.open('test-v1').then(function(cache) {
          cache.put(event.request, response)
        })
        return response.clone()
      })
    })
  )
})
```

Server Worker 对协议是有要求的，必须以 https 协议为前提。


- Push Cache HTTP2 在 server push 阶段存在的缓存

特性
- Push Cache 是缓存的最后一道防线。浏览器只有在 Memory Cache、HTTP Cache 和 Service Worker Cache 均未命中的情况下才会去询问 Push Cache
- Push Cache 是一种存在于会话阶段的缓存，当 session 终止时，缓存也随之释放。
- 不同的页面只要共享了同一个 HTTP2 连接，那么它们就可以共享同一个 Push Cache。
