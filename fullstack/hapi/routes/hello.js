module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply('hello hapi')
    },
    config: {
      // 登录功能
      // swagger API文档
      tags: ['api', 'test'],
      description: 'test hello api'
    }
  }
]