<template>
  <div>
    <swiper :indicator-dots="false" :autoplay="false" >
      <block v-for="(imgUrl, index) in imgUrls" :key="index">
        <swiper-item>
          <img :src="imgUrl" class="slide-image" width="355" height="150">
        </swiper-item>
      </block>
    </swiper>
    <p class="title">{{ title }}</p>
    <input type="text" placeholder="add todo" v-model="todoContent">
    <button @click="addTodo">添加todo</button>
    <button @click="clearTodo">清除已完成todo</button>
    <ul class="todos">
      <li
        v-for="(todo, i) in todos"
        :key="i"
        @click="toggle(i)"
        :class="{'done': todo.done}"
      >{{ todo.text }}</li>
      <li>{{ todoCount }} / {{ todos.length }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'hello mpvue',
      todos: [
        {
          text: '吃饭',
          done: false
        },
        {
          text: '睡觉',
          done: false
        },
        {
          text: '学习mpvue',
          done: false
        }
      ],
      todoContent: '',
      imgUrls: [
        'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
      ]
    }
  },
  computed: {
    todoCount: function () {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  methods: {
    toggle: function (i) {
      const todos = this.todos.slice(0)
      todos[i].done = !todos[i].done
      this.todos = todos
    },
    addTodo: function () {
      this.todos.push({
        text: this.todoContent,
        done: false
      })
      this.todoContent = ''
    },
    clearTodo: function () {
      this.todos = this.todos.filter(todo => !todo.done)
    }
  },
  watch: {
    todos: function () {
      console.log('serstorage')
      wx.setStorageSync('todos', this.todos)
    }
  },
  created () {
    this.todos = wx.getStorageSync('todos') || []
  }
}
</script>

<style>
.done {
  text-decoration: line-through
}
</style>
