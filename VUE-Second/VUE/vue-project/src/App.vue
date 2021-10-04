<template>
  <div id="app">
    <div >
         <button @click="method1">page1</button>
         <button @click="method2">page2</button>
         <router-link to="/one"><button>one</button></router-link>
         <router-link to="/two"><button>two</button></router-link>
         <!-- 路由的嵌套 -->
         <router-link to="/parent"><button>linkto-parent</button></router-link>
         <!-- 路由的参数传递 -->
         <router-link to="/query?name=admin"><button>query</button></router-link>
         <router-link to="/params/zhoujian"><button>params</button></router-link>
         <!--当to中使用的是对象的时候这里的to前面就需要添加 ：
            使用路由name方式配合params  使用路由path方式配合query-->
         <router-link :to="{name:'routeNameParams',params:{name:'object-params-zhoujian'}}"><button>route-Name-params</button></router-link>
         <router-link :to="{path:'/routerNameQuery',query:{name:'object-query-zhoujian'}}"><button>route-Name-query</button></router-link>
        <!-- 使用逻辑方法的进行路由跳转和参数传递 -->
        <button @click="query">logic-query</button>
        <button @click="params">logic-params</button>
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
        },
        query(){
          this.$router.push({
            path:'/routerNameQuery',
            query:{
              name:"使用逻辑代码以及query的方式传递参数"
            }
          })
        },
        params(){
        // 当path中使用/name/:id的时候，访问这个路由的时候就必须带上参数，不然会找不到页面就像/routeNameParams一样就会找到预料中的页面
          this.$router.push({
            name:"routeNameParams",
            params:{
              name:"使用逻辑代码以及params的方式传递参数"
            }
          })
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
