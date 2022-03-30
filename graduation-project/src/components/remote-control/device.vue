<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>远程控制</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card >

      <el-table :data="devices"   stripe border>
        <el-table-column
            type="expand" >
        </el-table-column>
        <el-table-column
            type="index" label="编号">
        </el-table-column>
        <el-table-column
            prop="name"
            label="设备名称"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="desc"
            label="设备描述"
            width="180">
        </el-table-column>
        <el-table-column
            prop="status"
            label="设备运行状态"
            width="180">
          <template slot-scope="innerScope">
            <el-tag type="success" v-if="innerScope.row.status == 1">运行</el-tag>
            <el-tag type="danger" v-if="innerScope.row.status != 1">停机</el-tag>
          </template>
        </el-table-column>

        <el-table-column
            prop="lockService"
            label="锁机服务"
            width="180">
          <template slot-scope="innerScope">
            <svg class="icon" aria-hidden="true" v-show="innerScope.row.lockService == 1">
              <use xlink:href="#icon-yikaitong"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-show="innerScope.row.lockService != 1">
              <use xlink:href="#icon-guanbi"></use>
            </svg>
          </template>
        </el-table-column>

        <el-table-column
            prop="lock"
            label="锁状态"
            width="180">
          <template slot-scope="innerScope">
            <svg class="icon" aria-hidden="true" v-show="innerScope.row.lock == 1">
              <use xlink:href="#icon-shangsuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-show="innerScope.row.lock == 0">
              <use xlink:href="#icon-jiesuo"></use>
            </svg>
          </template>
        </el-table-column>

        <el-table-column
            label="操作">
          <template slot-scope="operation">

            <el-button  size="small" @click="bindVideo()">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jiebang"></use>
              </svg>
            </el-button>

            <el-button type="danger" icon="el-icon-delete" size="small"
                       @click="deleteDevice()">
            </el-button>
          </template>
        </el-table-column>


      </el-table>

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

    },
    bindVideo(){},
    deleteDevice(){},
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