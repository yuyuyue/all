### hapi

  - 后端开发中的plugins
    api文档自动生成

  - .env + .ingore 不上传一些重要信息，通过env配置文件加载到进程之中  
    env2 获取 env 
    ```javascript
    require('env2')('./env')
    const { env } = process
    ```

  - hapi-swagger 调试工具
    yarn add  hapi-swagger@7 inert@4 vision@4 package

    ```javascript
      const inert = require('inert');
      const vision = require('vision');
      const package = require('package');
      const hapiSwagger = require('hapi-swagger');

      module.exports = [
        inert,
        vision,
        {
          register: hapiSwagger,
          options:{
            info: {
              title: '接口文档',
              version: package.version
            },
            grouping: 'tags',
            tags: [
              { name: 'tests', description: '测试相关'}
            ]
          }
        }
      ]
    ```  
  

  - joi 参数验证
    yarn add Joi
