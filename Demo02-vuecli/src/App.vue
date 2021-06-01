<template>
  <div id="app">
    <h1>首页</h1>
    <router-link to="/Content">Content</router-link>
    <router-link to="/text">Text</router-link>
    <!--为了展示组件的内容-->
    <router-view></router-view>
    <insert-app></insert-app>
  </div>
</template>

<script>
  // 导入需要使用的组件
  import InsertApp from "./components/InsertApp";
  export default {
  name: 'App',
  components: {
    //组件声明
    InsertApp
  },
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
</style>
