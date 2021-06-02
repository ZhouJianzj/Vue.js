<template>
    <h1>{{message}}</h1>
</template>

<script>
    export default {
        name: "text",
        //自定义的组件是这样是由data函数传递参数的
        data(){
          return{
            message:"text"
          }
        }
    }
</script>

<style scoped>

</style>
