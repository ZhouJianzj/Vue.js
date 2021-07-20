<!-- 自定义的helloworld组件 -->
<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
          <button v-on:click="function1()">{{name}}</button>
      </li>
      <li>
       <button v-on:click="function2()">Core Docs</button>
      </li>

    </ul>
    <h2>Ecosystem</h2>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props:['name'],
  data () {
    return {
      message: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    function1:function(){
      alert("111111")
    },
    function2:function(){
      alert("222222")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
