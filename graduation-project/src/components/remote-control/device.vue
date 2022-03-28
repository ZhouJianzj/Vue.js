<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>远程控制</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card >


    </el-card>


  </div>
</template>

<script>
export default {
  name: "device",
  data(){
    return{
      deviceQueryInfo:{
        key:'',
        pageSize:'',
        pageNum:''
      },
      devices:[

      ]
    }
  },
  methods:{
    clearSearch(){

    },
    search(){

    },

    add(){

    }
  }
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