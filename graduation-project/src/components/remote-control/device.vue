<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>远程控制</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">

        <el-col :span="8">
          <el-input placeholder="设备信息" clearable @clear="clearSearch" v-model="deviceQueryInfo.key">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="add">添加</el-button>
        </el-col>

        <el-table :data="devices" stripe border style="width: 100%" height="500">
          <el-table-column type="expand">
            <template slot-scope="props">
              <div v-if="props.row.videos.length != 0">
                <el-form label-position="left" inline class="demo-table-expand">

                  <el-form-item label="摄像头编号">
                    <span>{{ props.row.videos[0].id }}</span>
                  </el-form-item>

                  <el-form-item label="摄像头名称">
                    <span>{{ props.row.videos[0].name }}</span>
                  </el-form-item>
                  <el-form-item label="摄像头状态">
                    <el-tag type="success" v-if=" props.row.videos[0].status == 1">运行</el-tag>
                    <el-tag type="danger" v-else>停机</el-tag>
                  </el-form-item>
                  <el-form-item label="摄像头描述">
                    <span>{{ props.row.videos[0].desc }}</span>
                  </el-form-item>
                  <el-form-item label="绑定时间">
                    <span>{{ props.row.videos[0].createTime }}</span>
                  </el-form-item>
                  <el-form-item label="更新时间">
                    <span>{{ props.row.videos[0].updateTime }}</span>
                  </el-form-item>
                </el-form>
              </div>
            </template>

          </el-table-column>

          <el-table-column
              width="150"
              prop="id"
              sortable
              label="编号">
          </el-table-column>

          <el-table-column
              prop="name"
              label="设备名称"
              width="180">
          </el-table-column>

          <el-table-column
              prop="clientName"
              label="所属客户"
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
              label="操作"
              fixed="right">
            <template slot-scope="operation">
              <el-button v-if="operation.row.videos.length === 0" size="small" @click="bindVideo(operation.row)">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bangdingjilu"></use>
                </svg>
              </el-button>

              <el-button v-else size="small" @click="removeBind(operation.row.videos[0])">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-jiebang"></use>
                </svg>
              </el-button>

              <el-button type="danger" icon="el-icon-delete" size="small"
                         @click="deleteDevice(operation.row.id)">
              </el-button>
            </template>
          </el-table-column>


        </el-table>

        <!--      最全的分页-->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="deviceQueryInfo.pageNum"
            :page-sizes="[1, 2, 4, 8]"
            :page-size="deviceQueryInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </el-row>
    </el-card>

    <!--添加设备
        -->
    <el-dialog title="添加设备"
               :visible.sync="addDeviceDialogFormVisible"
               @close="addDeviceDialogCancel">
      <el-form :model="addForm"
               label-width="153px">

        <el-form-item label="设备编号">
          <div align="left">
            <el-input v-model="addForm.id" style="width: 60%;"></el-input>
          </div>
        </el-form-item>

        <el-form-item label="设备名称">
          <div align="left">
            <el-input v-model="addForm.name" style="width: 60%;"></el-input>
          </div>
        </el-form-item>

        <el-form-item label="设备描述">
          <div align="left">
            <el-input v-model="addForm.desc" style="width: 60%;"></el-input>
          </div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDeviceDialogCancel">取 消</el-button>
        <el-button type="primary" @click="addDeviceDialogAffirm">确 定</el-button>
      </div>
    </el-dialog>

    <!--绑定摄像头
    -->
    <el-dialog title="绑定摄像头"
               :visible.sync="bindVideoDialogFormVisible"
               @close="bindVideoDialogCancel">
      <el-form :model="bindForm"
               label-width="153px">

        <el-form-item label="设备编号">
          <div align="left">
            <el-input v-model="bindForm.deviceId" disabled style="width: 30%;"></el-input>
          </div>
        </el-form-item>

        <el-form-item label="设备名称">
          <div align="left">
            <el-input v-model="bindForm.name" disabled style="width: 30%;"></el-input>
          </div>
        </el-form-item>

        <el-form-item label="需要绑定设备">
          <div align="left">
            <el-select v-model="bindForm.videoId"
                       placeholder="请选择">
              <el-option :label="video.name" :value="video.id"
                         v-for="video in videosHasNoDevice">
              </el-option>
            </el-select>
          </div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bindVideoDialogCancel">取 消</el-button>
        <el-button type="primary" @click="bindVideoDialogAffirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getDevices()
  },
  name: "device",
  data() {
    return {
      deviceQueryInfo: {
        key: '',
        pageSize: 8,
        pageNum: 1
      },
      total: 0,
      devices: [],

      addDeviceDialogFormVisible: false,
      addForm: {},

      bindVideoDialogFormVisible: false,
      bindForm: {},
      videosHasNoDevice: []
    }
  },
  methods: {


    //添加设备对话框操作
    add() {
      this.addDeviceDialogFormVisible = true
    },
    addDeviceDialogCancel() {
      this.addDeviceDialogFormVisible = false
      this.addForm = {}
    },
    async addDeviceDialogAffirm() {
      console.log(this.addForm);
      const {data: res} = await this.$http.post("/rc/device/addDevice", this.addForm);
      if (res.code == 200) {
        this.$message.success(res.message)
        this.addDeviceDialogCancel()
        await this.getDevices()
      } else {
        this.$message.error(res.message)
      }
    },


    async getDevices() {
      const {data: res} = await this.$http.post("/rc/device/getDevices", this.deviceQueryInfo);
      // console.log(res.result);
      if (res.code == 200) {
        this.devices = res.result.list
        this.total = res.result.total

      }
    },
    clearSearch() {
      this.getDevices()
    },
    search() {
      this.getDevices()
    },


    //摄像头绑定设备
    async bindVideo(row) {
      this.bindForm.deviceId = row.id
      this.bindForm.name = row.name
      const {data: res} = await this.$http.get("/rc/video/getVideoHasNoDevice");
      if (res.code == 200){
        this.videosHasNoDevice = res.result
      }
      this.bindVideoDialogFormVisible = true
    },
    bindVideoDialogCancel() {
      this.bindVideoDialogFormVisible = false
      this.bindForm = {}
      this.videosHasNoDevice = []
    },
    async bindVideoDialogAffirm() {
      console.log(this.bindForm);
      const {data: res} = await this.$http.put("/rc/device/bindVideo", this.bindForm);
      if (res.code == 200) {
        this.$message.success(res.message)
        this.bindVideoDialogCancel()
        await this.getDevices()
      } else {
        this.$message.error(res.message)
      }
    },


    //摄像头解绑设备
    async removeBind(video) {
      const params = {
        deviceId: video.deviceId,
        videoId: video.id
      }
      const {data: res} = await this.$http.put("/rc/device/removeBindVideo", params);
      if (res.code == 200) {
        this.$message.success(res.message)
        await this.getDevices()
      } else {
        this.$message.error(res.message)
      }
    },

    //删除设备
    async deleteDevice(id) {
      const {data: res} = await this.$http.delete("/rc/device/deleteDevice", {params: {id: id}});
      if (res.code == 200) {
        this.$message.success(res.message)
        await this.getDevices()
      } else {
        this.$message.error(res.message)
      }
    },


    //分页
    handleSizeChange(val) {
      this.deviceQueryInfo.pageSize = val
      this.getDevices();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.deviceQueryInfo.pageNum = val
      this.getDevices();
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

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>