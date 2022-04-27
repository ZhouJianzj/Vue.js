<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>远程控制</el-breadcrumb-item>
      <el-breadcrumb-item>主题概览</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-col>
          <el-table
              :data="tableData"
              style="width: 100%"
              :row-class-name="tableRowClassName">

            <el-table-column
                prop="clientid"
                label="客户端标识符"
                >
            </el-table-column>
            <el-table-column
                prop="node"
                label="节点"
               >
            </el-table-column>
            <el-table-column
                prop="qos"
                label="消息质量"
               >
            </el-table-column>
            <el-table-column
                prop="topic"
                label="主题"
                >
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getTopics()
  },
  name: "topicView",
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex == 1) {
        return 'warning-row';
      } else if (rowIndex == 3) {
        return 'success-row';
      }
      return '';
    },

    async getTopics() {
      const {data: res} = await this.$http.get("/api/v4/subscriptions",
          {
            auth: {
              username: "admin",
              password: "public"
            }
          }
      );
      // console.log(res.data);
      this.tableData = res.data
    }
  }

}
</script>

<style scoped>
.warning-row {
  background: #e5a122;
}

.success-row {
  background: #49b60a;
}

.el-breadcrumb {
  margin-bottom: 20px;
}

.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}

</style>