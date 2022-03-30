<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>远程控制</el-breadcrumb-item>
      <el-breadcrumb-item>锁机功能</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <div>
        <el-steps :active="2" align-center finish-status="success">
          <el-step title="步骤1" status="success" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤2" status="success" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤3" status="success" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤4" status="error" description="这是一段很长很长很长的描述性文字"></el-step>
        </el-steps>
      </div>

    </el-card>

  </div>
</template>

<script>
export default {
  name: "lock-service"
}
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}

.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}

.el-table {
  margin-top: 50px;
  font-size: 12px;
}

.el-pagination {
  margin-top: 20px;
}
</style>