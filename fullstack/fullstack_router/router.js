export default class Router {
  constructor (options) {
    console.log(options)
    // 将数组配置项 转成 json
    this.routers = {}
    this.bindEvent()
    options.forEach(item => {
      this.router(item.path, () => {
        document.querySelector('#content').innerHTML = item.component
      })
    })
    this.init()
  }
  bindEvent () {
    const links = document.getElementsByTagName('a')
    ;[].forEach.call(links, link => {
      link.addEventListener('click', function () {
        const url = this.getAttribute('data-href')
        console.log(url)
        this.push(url)
      })
    })
  }
  push (url) {
    window.history.pushState({}, null, url)
    this.updateView()
  }
  updateView () {
    const currentUrl =  window.location.pathname || '/'
    console.log(currentUrl)
    this.routers[currentUrl] && this.routers[currentUrl]() 
  }
  route (path, cb) {
    this.routers[path] = cb
  }
  init () {
    window.addEventListener('load', this.updateView.bind(this), false)
    window.addEventListener('popstate', this.updateView.bind(this), false)
  }
}

