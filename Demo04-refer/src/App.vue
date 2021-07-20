<template>
  <div id="app">
    <br /><br /><br />
    <img src="./assets/logo.png">
    <br /><br /><br /><br /><br /><br /><br /><br />
    <!-- 两个自定义的组件 -->
    <HelloWorld v-bind:name="name"/>
    <foot></foot>
  </div>
</template>

<script> 
// 使用的组件需要import导入
import HelloWorld from './components/HelloWorld'
import foot from  './components/foot'
// 本身组件就要暴露出去，层级的暴露，自己使用的组件也需要暴露出去
export default {
  name: 'App',
  components: {
    HelloWorld,
    foot
  },
  // 自定义组件里的数据只能使用这种方式使用
  data(){
    return{
      name:"zhoujian"
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
</style>
