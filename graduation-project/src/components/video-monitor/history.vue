<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>远程控制</el-breadcrumb-item>
      <el-breadcrumb-item>监控画面</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card >
      <iframe    style="height: 100vh;width: 100%" src="http://10.90.15.202/vision/cloudconfig/custom/previews/display.html?tag=displays/demo-app-zj/%E7%9B%91%E6%8E%A7%EF%BC%881%EF%BC%89.json&visionId=693776110701248512"></iframe>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "history"
}
</script>

<style scoped>
.el-breadcrumb{
  margin-bottom: 20px;
}
.el-card{
  box-shadow: 0 1px 1px rgba(0,0,0,0.15)!important;
}
.el-table{
  margin-top: 50px;
  font-size: 12px;
}
.el-pagination{
  margin-top: 20px;
}
</style>