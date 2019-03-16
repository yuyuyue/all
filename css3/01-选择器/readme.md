#css
选择器的查看网址：https://www.w3.org/TR/2018/REC-selectors-3-20181106/

css不存在版本问题，只有level的差别
- css属性必须了解默认值和是否可以继承 通过https://developer.mozilla.org/zh-CN/来查找  

- 01选择器
    基本选择器
        id ：#
        类 ：.
        元素 ： 元素名比如body
        通配符 ： *
        分钟组 ：,
        后代 : 空格 选择所有后代

    子元素选择器
        > 子元素选择器: 直接后代选择器，不选择孙子
        + 直接相邻兄弟选择器：a + b选择与a向下相邻的b选择器 满足 b，并且相邻
        ~ 通用相邻兄弟选择器
    
    存在和值属性选择器 css2
        [attr]:该选择器包含attr属性的所有元素，无论attr为何值
        [attr="val"]:选择器包含attr的属性，且值也要为val
        [attr~="val"]:选择器包含attr的属性，并且属性是一个以空格分隔的列表，其中至少有一个val
    子串值选择器 css3
        [attr|="val"]: 选择器包含attr的属性，并且属性值必须以是val或者是以val-开头才可以选中
        [attr^="val"]: 选择器包含attr的属性，并且只要包含val开头就可以选中
        [attr$="val"]: 选择器包含attr的属性，并且只要以val结尾就可以选中
        [attr*="val"]: 选择器包含attr的属性，并且只要包含val就可以选中


