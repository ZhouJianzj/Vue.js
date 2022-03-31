<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>远程控制</el-breadcrumb-item>
      <el-breadcrumb-item>监控管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="摄像头基本信息查询" clearable @clear="clearSearch" v-model="query.key">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="add">添加</el-button>
        </el-col>

        <el-table
            :data="videos"
            style="width: 100%;
          margin-bottom: 20px;"
            height="550"
        >

          <el-table-column
              prop="name"
              label="姓名"
              sortable
              width="100">
          </el-table-column>
          <el-table-column
              prop="phone"
              label="手机号">
          </el-table-column>
          <el-table-column
              prop="email"
              label="邮箱">
          </el-table-column>

          <el-table-column
              prop="ccName"
              label="委托人/债权人"
              width="100">
          </el-table-column>

          <el-table-column
              prop="ccPhone"
              label="委托人/债权人手机号">
          </el-table-column>

          <el-table-column
              prop="ccEmail"
              label="委托人/债权人邮箱">
          </el-table-column>

          <el-table-column
              prop="createTime"
              label="创建时间">
          </el-table-column>


          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="warning" icon="el-icon-edit" size="small" @click="modify(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="small" @click="delete(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--      最全的分页-->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="query.pageNum"
            :page-sizes="[1, 2, 4, 8]"
            :page-size="query.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

      </el-row>
    </el-card>
  </div>

</template>

<script>
export default {
  created() {
    this.getVideos()
  },
  name: "monitor",
  data() {
    return {
      query: {
        pageNum: 1,
        pageSize: 8,
        key: ""
      },
      total: 0,
      videos: [],

    }
  },
  methods: {
    getVideos() {
    },

    clearSearch() {
    },
    search() {
    },
    add() {
    },
    modify() {
    },
    delete() {
    },


    //分页
    handleSizeChange(val) {
      this.query.pageSize = val
      this.getVideos();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.query.pageNum = val
      this.getVideos();
      console.log(`当前页: ${val}`);
    },
  }
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


.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>