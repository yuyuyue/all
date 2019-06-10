//  相对导入和绝对导入 
// 相对 / ./ ../ 开头 ，其他绝对

// 解析策略

// classic
// /root/src/folder/module.ts
// /root/src/folder/module.d.ts
// 从底层依次向上层查找
/*
/root/src/folder/moduleB.ts
/root/src/folder/moduleB.d.ts
/root/src/moduleB.ts
/root/src/moduleB.d.ts
/root/moduleB.ts
/root/moduleB.d.ts
/moduleB.ts
/moduleB.d.ts
*/

// node
// /root/src/folder/module.ts
// /root/src/folder/module.d.ts
// 检测是否存在改文件，检测该文件下是否有package.json文件，找到main模块，找到index.ts

/*
/root/src/node_modules/moduleB.js
/root/src/node_modules/moduleB/package.json (如果指定了"main"属性)
/root/src/node_modules/moduleB/index.js 

/root/node_modules/moduleB.js
/root/node_modules/moduleB/package.json (如果指定了"main"属性)
/root/node_modules/moduleB/index.js 

/node_modules/moduleB.js
/node_modules/moduleB/package.json (如果指定了"main"属性)
/node_modules/moduleB/index.js/
*/

// 路径映射
// 目录结构
/*
projectRoot
├── folder1
│   ├── file1.ts (imports 'folder1/file2' and 'folder2/file3')
│   └── file2.ts
├── generated
│   ├── folder1
│   └── folder2
│       └── file3.ts
└── tsconfig.json
*/
// 对应的tsconfig.json
/*
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "*": [
        "*",
        "generated/*"
      ]
    }
  }
}
*/
/*
导入'folder1/file2'
匹配'*'模式且通配符捕获到整个名字。
尝试列表里的第一个替换：'*' -> folder1/file2。
替换结果为非相对名 - 与baseUrl合并 -> projectRoot/folder1/file2.ts。
文件存在。完成。
导入'folder2/file3'
匹配'*'模式且通配符捕获到整个名字。
尝试列表里的第一个替换：'*' -> folder2/file3。
替换结果为非相对名 - 与baseUrl合并 -> projectRoot/folder2/file3.ts。
文件不存在，跳到第二个替换。
第二个替换：'generated/*' -> generated/folder2/file3。
替换结果为非相对名 - 与baseUrl合并 -> projectRoot/generated/folder2/file3.ts。
文件存在。完成。
*/