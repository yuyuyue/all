const Joi = require('Joi')

module.exports = [
  {
    method: 'POST',
    path: '/orders',
    handler: async (request, reply) => {
      reply()
    },
    config: {
      tags: ['api', 'orders'],
      description: '创建订单',
      validate: {
        payload: {
          goodsList: Joi.array().items(
            Joi.object().keys({
              goods_id: Joi.number().integer(),
              count: Joi.number().integer()
            })
          )
        },
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  }
]