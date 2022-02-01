<template>
<div>
  <el-button @click="logout">退出</el-button>
</div>
</template>

<script>
export default {
  name: "home",
  methods:{
    logout(){
      window.sessionStorage.clear()
      this.$router.push('/sys/login')
      this.$message.info("已退出登录！")
    }
  }
}
</script>

<style scoped>

</style>