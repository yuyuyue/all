<template>
  <div>
    <h2>{{msg}}</h2>
    <h3>{{$store.state.count}}-{{count}}</h3>
    <!-- <h3>{{$store.state.a.count}}-{{count}}</h3> -->
    <p>
      <button @click="$store.commit('add', 3)">+</button>
      <button @click="reduce(6)">-</button>
    </p>
     <p>
      <button @click="addAction">A+</button>
      <button @click="reduceAction">A-</button>
    </p>
  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapState,mapMutations,mapGetters,mapActions,  } from 'vuex'
export default {
  data () {
    return {
      msg: 'hi vuex'
    }
  },
  // 不常用
  // computed: {
  //   count () {
  //     return this.$store.state.count
  //   }
  // },
  // 2
  computed: mapState({
    count: state => state.count
  }),
  // 3
  computed: {
    ...mapState(['count']),
    ...mapGetters(['count'])
  },
  methods: {
    ...mapMutations(['add', 'reduce']),
    ...mapActions(['addAction', 'reduceAction'])
  },
  store
}
</script>