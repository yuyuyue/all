<template>
  <div>
    <h2>{{msg}}</h2>
    <h2>id: {{$route.params.id}}</h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'vue params'
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('准备进入路由')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('准备离开路由')
    next()
  }
}
</script>
