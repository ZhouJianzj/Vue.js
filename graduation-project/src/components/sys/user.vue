<template>

<div>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card >
    <el-row :gutter="20">
      <el-col :span="8">

          <el-input placeholder="请输入内容" >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>

      </el-col>
      <el-col :span="4">

          <el-button type="primary">添加</el-button>

      </el-col>


        <el-table
            :data="resultUserList"
            style="width: 100%"
            stripe border
        >
          <el-table-column
              type="index"
              >
          </el-table-column>
          <el-table-column
              prop="dep.name"
              label="部门"
              width="120">
          </el-table-column>

          <el-table-column
              prop="role.name"
              label="职务"
              width="50"
              >
          </el-table-column>
          <el-table-column
              prop="user.username"
              label="名称"
              width="120">
          </el-table-column>
          <el-table-column
              prop="user.phone"
              label="手机号"
              width="120">
          </el-table-column>
          <el-table-column
              prop="user.email"
              label="邮箱"
              width="150">
          </el-table-column>
          <el-table-column
              prop="dep.desc"
              label="部门描述"
              >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="warning" icon="el-icon-edit" size="small"></el-button>
                <el-button type="primary" icon="el-icon-share" size="small"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="small"></el-button>
            </template>

          </el-table-column>
        </el-table>
<!--      最全的分页-->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryParams.pageNo"
          :page-sizes="[1, 2, 4, 8]"
          :page-size="queryParams.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>

    </el-row>

  </el-card>
</div>
</template>

<script>
export default {
  name: "user",
  data(){
    return{
      queryParams: {
        key: '',
        pageNo: 1,
        pageSize: 8,
      },
      resultUserList:[],
      total:0
    }
  },
  created() {
    this.getUserList()
  },
  methods:{
    async getUserList(){
      const res = await this.$http.get('/sys/user/key',{params:this.queryParams})
      this.resultUserList = res.data.result.list
      this.total = res.data.result.total
    },

    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.getUserList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.queryParams.pageNo = val
      this.getUserList()
      console.log(`当前页: ${val}`);
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