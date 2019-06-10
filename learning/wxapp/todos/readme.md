- wxml模版
  看到的是page 不是wxml，是编译后的wxml
  js data 拿模版去生成的page
- 登录 
  页面不是静态的 dom ajax
  this,setData({}) 设置电话，并且渲染
  数据驱动界面， 响应式
  MVVM 
  数据状态 === 界面状态
  登录状态 hasUserInfo