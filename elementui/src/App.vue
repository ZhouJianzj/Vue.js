<template>
  <div id="app">
    <Txt2></Txt2>
    
    <router-link to="/t">tranf</router-link>
    <div>
      <router-view></router-view>

    </div>
  </div>
</template>

<script>
import Txt2 from './components/Txt2'

export default {
  name: 'App',
  components:{
    Txt2
    
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
  /* 边缘对齐的 */
  margin-top: 0px;
}
</style>
