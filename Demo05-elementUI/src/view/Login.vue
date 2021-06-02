<template>
  <div>
    <h1>login</h1>
<!--    组件接受参数-->
    {{$route.params.id}}
    {{$route.params.name}}
  </div>
</template>

<script>
  export default {
    name: "login"
  }
</script>

<style scoped>
</style>
