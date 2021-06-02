<template>
  <div id="app">

    <router-link to="/dir">dir</router-link>
<!--    参数的传递，需要使用v-bind绑定数据，之前的直接是to到一个router地址那是简写，其实里面是一个对象-->
    <router-link :to="{name:'login',params:{id:1,name:'zhoujian'}}">login</router-link>

    <router-link to="/axiosOne">axiosOne</router-link>
    <router-link to="/axiosTwo">axiosTwo
    </router-link>
    <router-view></router-view>


  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>


