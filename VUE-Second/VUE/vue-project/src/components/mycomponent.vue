<template>
  <div >
    <h1>{{ msg }}</h1>
    <span>{{name}}</span>
  </div>
  


</template>

<script>
  export default{
    name:"mycomponent",
    props:['name'],
    data(){
      return{
        msg:"zhoujian",

      }
    }

  }
</script>

<style>
</style>
