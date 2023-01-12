<template>
 <div>
   <router-link to="/two/test" >跳转到two</router-link>
   <router-view></router-view>
 </div>
</template>

<script>
export default {
  name: "one",
  methods:{
    test(){
      this.$router.push();

    }
  }
}
</script>

<style scoped>

</style>