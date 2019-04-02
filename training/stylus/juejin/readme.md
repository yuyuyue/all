- stylus优点
  可以使用变量 $
  减少输入{}: ;
  可以使用函数
  嵌套 模块 自动加父类前缀  可以折叠，完全匹配html dom树
    &运算符引用上一级的层次类名，同时可以缩进，省去重复上一次的选择

- 垂直居中
  1.如果display:flex 
  使用align-items center
  2.vertical-align: middle 不能使用flex
  3.行高，纯文字，不推荐
- display:flex 布局是css在移动端最爽的布局方案，手机
  子元素们的对其
  水平：justify-content 
  垂直：align-items center
  传统方案是 img + 兄弟节点使用 vertical-align: middle

- flex
  1 flex：1 比例划分，在只给一个元素设置，占据剩下的所有空间
  2 父元素与多个子元素的关系
    水平对齐方式 justify-content 
    垂直对齐方式 align-items center
  3 剩余的空间flex-grow来分配空间

- 命令
  stylus -w xxx.styl -o xxx.css -w监视实时更新 -o创建css