<template>
  <div id="app">
    <div >
         <button @click="method1">page1</button>
         <button @click="method2">page2</button>
         <router-view></router-view>
    </div>
    <div>
      <mycomponent v-bind:name="name"></mycomponent>
    </div>
  </div>

</template>

<script>
 import mycomponent from "./components/mycomponent"

 export default {
  name: 'App',
  components:{
    mycomponent
  },
  data(){
    return{
      name:"zj"
    }
  },
  methods:{
    method1(){
          this.$router.push('/page1');
        },
        method2(){
          this.$router.push('/page2');
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
