<template>
  <div id="app">
    <img src="./assets/logo.png">
    <button @click="goback">后退</button>
    <button @click="gonext">前进</button>
    <button @click="gohome">返回首页</button>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <!-- <router-view name="left"/>
    <router-view name="right"/> -->
    <router-link to="/" >home</router-link>
    <router-link to="/goHome" >gohome</router-link>
    <router-link to="/params/196/aaaa" >params</router-link>
    <router-link to="/pa/196/aaaa" >pa</router-link>
    <router-link to="/goParams/213/bbbb" >goparams</router-link>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goback () {
      this.$router.go(-1)
    },
    gonext () {
      this.$router.go(1)
    },
    gohome () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity .5s;
}
.fade-leave{
  opacity: 1;
}
.fade-leave-active {
  opacity: 0;
  transition: opacity .5s;
}
</style>
