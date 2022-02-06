<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>日志</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="操作查询" v-model="queryParams.key"
                    clearable @clear="clearLog">
            <el-button slot="append" icon="el-icon-search" @click="findLog"></el-button>
          </el-input>



        </el-col>
        <el-col :span="4">

          <el-date-picker
              v-model="date"
              clearable
              @blur="dataBlur"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="datetimerange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
          </el-date-picker>

        </el-col>

              <el-table :data="logsList" style="width: 100%" stripe border>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="path" label="路径" width="120"></el-table-column>
                <el-table-column prop="browser" label="客户端" width="120"></el-table-column>
                <el-table-column prop="username" label="用户名" width="120"></el-table-column>
                <el-table-column  label="操作类型" width="180">
                  <template slot-scope="scope">
                   <el-tag size="small" effect="dark" v-if="scope.row.method === 'POST'">POST</el-tag>
                   <el-tag size="small"effect="dark" v-if="scope.row.method === 'GET' " type="success">GET</el-tag>
                   <el-tag size="small" effect="dark" v-if="scope.row.method === 'PUT'" type="warning">PUT</el-tag>
                   <el-tag size="small"effect="dark" v-if="scope.row.method === 'DELETE' "type="danger">DELETE</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="option" label="操作行为"width="180"></el-table-column>
                <el-table-column  label="操作结果" width="180">
                  <template slot-scope="scope">
                    <el-tag size="small" v-if="scope.row.result === '200 OK' " type="success">GET</el-tag>

                    <el-tag size="small" v-if="scope.row.result === '500 ERROR' "type="danger">DELETE</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" label="操作时间" ></el-table-column>
              </el-table>
<!--              最全的分页-->
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
  created() {
    this.getLogs()
  },
  name: "log",
  data(){
    return{
      queryParams:{
        key:"",
        from:"",
        end:"",
        pageNo:1,
        pageSize:8
      },
      logsList:[],
      date:'',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      total:0
    }
  },
  methods:{
    async getLogs() {
      const {data:res} = await this.$http.get('/sys/log', {params: this.queryParams})
      console.log(res);
      this.logsList = res.result.list
      this.total = res.result.total
    },
    clearLog(){
      this.queryParams.key = ''
      this.getLogs();
    },
    findLog(){
      this.getLogs()
    },

    dataBlur(){
      this.queryParams.from =  this.date[0]
      this.queryParams.end = this.date[1]
      this.getLogs();
    },
    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.getLogs();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.queryParams.pageNo = val
      this.getLogs()
      console.log(`当前页: ${val}`);
    },
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