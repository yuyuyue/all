- css 命名词汇
  feess 
  *-item ： 处理列表

- html结构以及布局
  从上至下 从左至右 语意性 功能性
  1.套路
    content>h3+p 正文 = 标题 + p
  2.多盒子
  3.a 作为盒子，在移动的是正常的，  初始化display:block;  
  4.盒子模型 
    文字line-height padding margin
  5.文字截断
    tmall 商铺信息是商家填，高度不会被限制
    display:-webket-box; 新的盒子模型，想flex来划分父元素的空间
    overflow:hidden;
    -wibkit-line-clamp:行数
    -webkit-box-orient:vertical;划分父盒子的方向
  
  6.浮动
  离开文档流
  在一个盒子中将要浮动的元素写在最前面左右布局
  在flex布局之前，我们一般借助于float布局
  图片的宽高？ 宽度用百分比，自适应的需求
  高度 ？ 内部加div padding-top:100% ：根据自身宽度来做比例，为100%时就被拉伸成正方形，自适应设备盒子中的宽高的等比例设置
  width 百分比
  height padding-top