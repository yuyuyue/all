<template>
  <div>
    <!-- 在router切换会触发 mounted -->
    <transition name="form-fade" mode="in-out">
      <section class="form_container" v-show="showLogin">
        <div class="manage-tip">
          <span class="title">后台管理系统</span>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
        <el-form-item>
          <span class="fa-tips">
            <i class="fa fa-user"></i>
          </span>
          <el-input class="area" type="text" placeholder="用户名" v-model="loginForm.username"></el-input>
        </el-form-item>
      </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
export default {
  // 登录状态 vuex
  // 提交过程中，字段保错，v-model 自身的
  data() {
    return {
      showLogin: true,
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  name: "Login",
  mounted() {
    this.showLogin = true
  },
};
</script>

<style scoped lang="less">
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>
