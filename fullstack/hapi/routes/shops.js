module.exports = [
  {
    method: 'GET',
    path: '/shops',
    handler: (request, reply) => {
      reply('hello hapi')
    },
    config: {
      // 登录功能
      // swagger API文档
      tags: ['api', 'shops'],
      description: '获取店铺的列表'
    }
  },
  {
    method: 'GET',
    path: '/shops/{shopId}/goods',
    handler: async (request, reply) => {
      reply()
    },
    config: {
      tags: ['api', 'goods'],
      description: '获取店铺的商品列表'
    }
  }
]