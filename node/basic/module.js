/**
 * 模块化
		- 在Node中，一个js文件就是一个模块
		- 在Node中，每一个js文件中的js代码都是独立运行在一个函数中
      而不是全局作用域，所以一个模块的中的变量和函数在其他模块中无法访问
  在node中有一个全局对象 global，它的作用和网页中window类似
		在全局中创建的变量都会作为global的属性保存
		在全局中创建的函数都会作为global的方法保存
 * function (exports, require, module, __filename, __dirname) {}
     exports
		 	- 该对象用来将变量或函数暴露到外部

		 require
		 	- 函数，用来引入外部的模块

		 module
		 	- module代表的是当前模块本身
		 	- exports就是module的属性
		 	- 既可以使用 exports 导出，也可以使用module.exports导出

		 __filename
 			C:\Users\lilichao\WebstormProjects\class0705\01.node\04.module.js
 			- 当前模块的完整路径

	  	 __dirname
 			C:\Users\lilichao\WebstormProjects\class0705\01.node
 			- 当前模块所在文件夹的完整路径
 */

