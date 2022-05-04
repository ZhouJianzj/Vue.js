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
          <el-button type="primary" @click="add">监控接入</el-button>
        </el-col>

        <el-table
            :data="videos"
            style="width: 100%;
          margin-bottom: 20px;"
            height="550"
        >

          <el-table-column
              prop="deviceSerial"
              label="监控设备序列号"
              sortable
              width="100">
          </el-table-column>
          <el-table-column
              prop="deviceName"
              label="监控设备名称">
          </el-table-column>
          <el-table-column
              prop="deviceType"
              label="监控设备类型">
          </el-table-column>

          <el-table-column
              prop="status"
              label="监控设备状态"
              width="100">
          </el-table-column>

          <el-table-column
              prop="defence"
              label="设备布撤防状态">
          </el-table-column>

          <el-table-column
              prop="deviceVersion"
              label="设备版本号">
          </el-table-column>

          <el-table-column
              prop="addTime"
              label="创建时间">
          </el-table-column>

          <el-table-column
              prop="updateTime"
              label="更新时间">
          </el-table-column>


          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="warning" icon="el-icon-edit" size="small"
                         @click="modify(scope.row)">

              </el-button>
              <el-button type="danger" icon="el-icon-delete" size="small"
                         @click="deleteVideo(scope.row.deviceSerial)">

              </el-button>

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

    <!--    监控设备接入-->
    <el-dialog title="监控设备接入"
               :visible.sync="addVideoDialogVisible"
    >
      <el-input placeholder="设备序列号" v-model="deviceSerial"/>
      <br><br>
      <el-input placeholder="验证码" v-model="validateCode"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCancel">取 消</el-button>
        <el-button type="primary" @click="addAffirm">确 定</el-button>
      </div>
    </el-dialog>


    <!--    监控设备名称修改-->
    <el-dialog title="监控设备接入"
               :visible.sync="modifyVideoDialogVisible"
    >
      <el-input placeholder="设备名称" v-model="deviceName"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCancel">取 消</el-button>
        <el-button type="primary" @click="modifyAffirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  created() {
    this.getAccessToken()
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

      accessToken: "",
      addVideoDialogVisible: false,
      modifyVideoDialogVisible:false,

      deviceSerial: "",
      validateCode: "",

      deviceName:"",
      row:{}

    }
  },
  methods: {
    async getAccessToken() {
      const {data: res} = await this.$http.post("/vm/getAccessToken");
      if (res.code == "200") {
        this.accessToken = res.data.accessToken
        const {data: res1} = await this.$http.post("/vm/getVideos", {
          accessToken: res.data.accessToken
        });
        if (res1.code == "200") {
          this.videos = res1.data
        } else {
          this.$message.error(res1.msg)
        }
      } else {
        this.$message.error(res.msg)
      }
    },
    clearSearch() {
      this.query.key = ""
    },
    async search() {
      const {data: res} = await this.$http.post("/vm/searchVideo", {
        accessToken: this.accessToken,
        deviceSerial: this.query.key
      });
      if (res.code == "200") {
        this.videos = []
        this.videos.push(res.data)
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }

    },
    async add() {
      this.addVideoDialogVisible = true
    },
    addCancel() {
      this.addVideoDialogVisible = false
      this.deviceSerial = ""
      this.validateCode = ""
      this.deviceName = ""
      this.modifyVideoDialogVisible = false
      this.row = {}
    },
    async addAffirm() {
      // BDYOZF
      const {data: res} = await this.$http.post("/vm/addVideo", {
        accessToken: this.accessToken,
        deviceSerial: this.deviceSerial,
        validateCode: this.validateCode
      });
      if (res.code == "200") {
        this.$message.success(res.msg)
        this.addCancel()
        this.$router.go(0)
      } else {
        this.$message.error(res.msg)
      }
    },


    modify(row){
      this.modifyVideoDialogVisible = true
      this.row = row
    },

    async modifyAffirm() {

      const {data: res} = await this.$http.post("/vm/modifyVideo", {
        accessToken: this.accessToken,
        deviceSerial: this.row.deviceSerial,
        deviceName:this.deviceName
      });
      if (res.code == "200") {

        this.$message.success(res.msg)
        this.$router.go(0)
        this.addCancel()
      } else {
        this.$message.error(res.msg)
      }

    },
     async deleteVideo(deviceSerial) {
       const {data: res} = await this.$http.post("/vm/deleteVideo", {
         accessToken: this.accessToken,
         deviceSerial: deviceSerial
       });
       if (res.code == "200") {

         this.$message.success(res.msg)
         this.$router.go(0)
       } else {
         this.$message.error(res.msg)
       }
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