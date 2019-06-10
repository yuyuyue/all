// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'yby-d2ju2'

cloud.init()
const db = cloud.database({ env })



// 云函数入口函数
exports.main = async (event, context) => {
  const usetInfo = event.usetInfo


  // 先查询有无用户openid
  const checkUser = await db.collection('user')
  .where({
    openId: usetInfo.openId
  })
  .get()
  // 如果有用户，则更新基本的用户信息
  if (checkUser.data.length > 0) {
    await db.collection('user').doc(checkUser.data[0]._id)
    .update({
      data: {
        avatarUrl: event.avatarUrl,
        nickName: event.nickName,
        sex: event.sex
      }
    })
  } else {
    const insertResult = await db.collection('user').insert({
      avatarUrl: event.avatarUrl,
      nickName: event.nickName,
      sex: event.sex,
      name: '',
      openId: event.usetInfo.openId,
      createTime: new Date()
    })
  }
}