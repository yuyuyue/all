<template>
  <div class="login">
    <div class="container">
      <p class="title">后台管理系统</p>
      <div class="msg mt20">
        <el-input v-model="user" placeholder="请输入内容"></el-input>
      </div>
      <div class="msg mt20">
        <el-input v-model="password" placeholder="请输入内容"></el-input>
      </div>
      <div class="btn mt20">
        <!-- router-link to直接跳转 -->
        <!-- <router-link to="/hello">
        </router-link> -->
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.user && this.password) {
        localStorage.setItem('userName', this.user)
        // this.$router.push('/hello')// 字符串路由跳转
        // this.$router.push({path: '/hello'})// 对象跳转路由
        this.$router.push({name: 'HelloWorld', param: { userId: 1 }})// 编程式跳转，可以携带参数
      }
    }
  }
}
</script>

<style scoped>
/* scoped只作用于当前页面 */
.login{
  width: 100%;
}
.container{
  width: 300px;
  padding: 50px;
  border-radius: 5px;
  margin: 0 auto;
  padding-top: 100px;
  box-shadow: 0 0 20px #c6c6c6;
}
.mt20{
  margin-top: 20px;
}
.btn button{
  width: 100%;
}
.title{
  font-size: 26px;
  font-weight: bold;
  color: #505458;
}
</style>
