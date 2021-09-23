<template>
  <div id="app">
    <router-view/>
    <div>
      <mycomponent></mycomponent>
    </div>
  </div>
  
</template>

<script>
 import mycomponent from "./components/mycomponent"
export default {
  name: 'App',
  components:{
    mycomponent
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
