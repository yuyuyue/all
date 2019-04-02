- 清除浮动的五种方法

  <!-- 1 在父元素底部加上 clear:left right both 父元素的class加入一个clearFix的类名
    <div style="clear:left;"></div>
   -->
  <!-- 2 父元素的class加入一个clearFix{float:left}将父容器也加上浮动 -->
  <!-- 3 使用css中的伪类after，给父元素div添加一个cleal clearFix的class类，
    .clearFix::after{
      content: '';
      clear: both;
      display: block;
    } 
  -->
  <!-- 4.BFC(块级格式化上下文) 的效果来弥补父容器高度塌陷
    div.content{
      overflow: auto hidden scroll
    }
  -->
  <!-- 
    尼古拉师大师 ：把父容器的display设置为table， 可以创建一个匿名表格单元，直接触发BFC
    .content{
      display: table
    }
   -->
