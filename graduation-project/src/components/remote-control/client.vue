<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>远程控制</el-breadcrumb-item>
      <el-breadcrumb-item>客户维护</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="客户信息/债权人基本信息查询" clearable @clear="clearSearch" v-model="query.key">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="add">添加</el-button>
        </el-col>

        <el-table
            :data="clientList"
            style="width: 100%;
          margin-bottom: 20px;"
            height="550"
        >
          <el-table-column type="expand" width="55">
            <template slot-scope="scope">
              <el-table :data="scope.row.devices" style="" v-show="scope.row.devices.length != 0 ">
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
                    label="锁机状态"
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
                    label="解除绑定">
                  <template slot-scope="operation">
                    <el-button size="small" @click="removeBindDevice(scope.row.id,operation.row.id)">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jiebang"></use>
                      </svg>
                    </el-button>
                  </template>
                </el-table-column>

                <el-table-column
                    label="开/关锁">
                  <template slot-scope="switchScope">
                    <el-switch ref="switchRef"
                               v-if="switchScope.row.lock != null"
                               v-model="switchScope.row.switch"

                               active-color="#13ce66"
                               inactive-color="#ff4949"
                               @change="switchChange(switchScope.row)"
                               @click="openFullScreen2">
                    </el-switch>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>

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
              <el-button size="small" @click="bindDevice(scope.row)">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bangdingjilu"></use>
                </svg>
              </el-button>
              <el-button type="danger" icon="el-icon-delete" size="small"
                         @click="deleteClient(scope.row.id)"></el-button>
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


    <!--添加
      涉及邮箱验证和手机号验证    -->
    <el-dialog title="添加新的客户"
               :visible.sync="addDialogFormVisible"
               @close="addDialogCancel">
      <el-form :model="addForm"
               label-width="153px"
               ref="addFormRef"
               :rules="addFormRules">

        <el-form-item label="客户名称">
          <div align="left">
            <el-input v-model="addForm.name" style="width: 30%;"></el-input>
          </div>
        </el-form-item>

        <el-form-item
            label="客户邮箱"
            prop="email">
          <div align="left">
            <el-input v-model="addForm.email" style="width: 30%;"></el-input>
            <el-button type="success" plain @click="getAuthCode('1',addForm.email)">获取验证码</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <div align="left">
            <el-input v-model="addForm.emailAuthCode"
                      @blur="inputOnBlur('1',addForm.emailAuthCode)" style="width: 30%;"
                      placeholder="验证码"
                      :suffix-icon="suffixIcon1">

            </el-input>
          </div>
        </el-form-item>


        <el-form-item label="客户手机号" prop="phone">
          <div align="left">
            <el-input v-model="addForm.phone" style="width: 30%;"></el-input>
            <el-button type="success" plain @click="getAuthCode('2',addForm.phone)">获取验证码</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <div align="left">
            <el-input style="width: 30%;"
                      v-model="addForm.phoneAuthCode"
                      placeholder="验证码"
                      @blur="inputOnBlur('2',addForm.phoneAuthCode)"
                      :suffix-icon="suffixIcon2">

            </el-input>
          </div>
        </el-form-item>


        <el-form-item label="债权人/委托人姓名">
          <div align="left">
            <el-input v-model="addForm.ccname" style="width: 30%;"></el-input>
          </div>
        </el-form-item>

        <el-form-item label="债权人/委托人邮箱" prop="ccemail">
          <div align="left">
            <el-input v-model="addForm.ccemail" style="width: 30%;"></el-input>
            <el-button type="success" plain @click="getAuthCode('3',addForm.ccemail)">获取验证码</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <div align="left">
            <el-input v-model="addForm.ccemilAuthCode"
                      style="width: 30%;"
                      placeholder="验证码"
                      @blur="inputOnBlur('3',addForm.ccemilAuthCode)"
                      :suffix-icon="suffixIcon3"
            >

            </el-input>
          </div>
        </el-form-item>

        <el-form-item label="债权人/委托人手机号" prop="ccphone">
          <div align="left">
            <el-input v-model="addForm.ccphone" style="width: 30%;"></el-input>
            <el-button type="success" plain @click="getAuthCode('4',addForm.ccphone)">获取验证码</el-button>
          </div>
        </el-form-item>

        <el-form-item>
          <div align="left">
            <el-input v-model="addForm.ccphoneAuthCode"
                      style="width: 30%;"
                      placeholder="验证码"
                      @blur="inputOnBlur('4',addForm.ccphoneAuthCode)"
                      :suffix-icon="suffixIcon4"
            >

            </el-input>
          </div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogCancel">取 消</el-button>
        <el-button type="primary" @click="addDialogAffirm">确 定</el-button>
      </div>
    </el-dialog>

    <!--绑定
            -->
    <el-dialog title="绑定设备"
               :visible.sync="bindDeviceDialogFormVisible"
               @close="bindDeviceDialogCancel">
      <el-form :model="bindForm"
               label-width="153px">

        <el-form-item label="客户编号">
          <div align="left">
            <el-input v-model="bindForm.clientId" disabled style="width: 30%;"></el-input>
          </div>
        </el-form-item>

        <el-form-item label="客户名称">
          <div align="left">
            <el-input v-model="selectRow.name" disabled style="width: 30%;"></el-input>
          </div>
        </el-form-item>

        <el-form-item label="需要绑定设备">
          <div align="left">
            <el-select v-model="bindForm.clientBindNewDevice"
                       multiple placeholder="请选择">
              <el-option :label="video.name" :value="video.id"
                         v-for="video in devicesHasNoClient">
              </el-option>
            </el-select>
          </div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bindDeviceDialogCancel">取 消</el-button>
        <el-button type="primary" @click="bindDeviceAffirm">确 定</el-button>
      </div>
    </el-dialog>


    <!--    设备关锁密码验证-->
    <el-dialog title="开锁密码校验"
               :visible.sync="lockPasswordDialogVisible"
    >
      <el-input show-password
                style="width: 250px"
                placeholder="请输入开锁密码"
                v-model="lockPassword"/>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="lockPasswordDialogAffirm">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
export default {
  name: "client",
  created() {
    this.getClientList()
  },
  data() {
    //自定义的校验规则
    const checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      const reg = regEmail.test(value)
      this.reg = reg
      if (!reg) callback(new Error('请输入正确的邮箱'))
      callback()
    }
    const checkPhone = (rule, value, callback) => {
      const regModel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      const reg = regModel.test(value)
      this.reg = reg
      if (!reg) callback(new Error("请输入正确的手机号"))
      callback()
    }
    return {
      clientList: [],

      query: {
        pageNum: 1,
        pageSize: 8,
        key: ""
      },
      total: 0,

      addForm: {
        name: '',
        phone: "",
        phoneAuthCode: "",
        email: "",
        emailAuthCode: "",
        ccname: "",
        ccemail: "",
        ccemilAuthCode: "",
        ccphone: "",
        ccphoneAuthCode: ""
      },
      emailAuthCode: "",
      phoneAuthCode: "",
      ccemilAuthCode: "",
      ccphoneAuthCode: "",

      editDialogFormVisible: false,

      addDialogFormVisible: false,


      addFormRules: {
        phone: [
          {validator: checkPhone, trigger: 'blur'}
        ],
        email: [
          {validator: checkEmail, trigger: 'blur'}
        ],
        ccphone: [
          {validator: checkPhone, trigger: 'blur'}
        ],
        ccemail: [
          {validator: checkEmail, trigger: 'blur'}
        ],
      },
      reg: false,
      suffixIcon1: "",
      suffixIcon2: "",
      suffixIcon3: "",
      suffixIcon4: "",

      selectRow: {},
      devicesHasNoClient: [],
      bindDeviceDialogFormVisible: false,
      bindForm: {
        clientId: '',
        clientBindNewDevice: []
      },

      lockPassword: "",
      lockPasswordDialogVisible: false,
      row: {},
    }

  },
  methods: {

    openFullScreen2() {

      const loading = this.$loading({
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },

    //快关锁操作
    async switchChange(row) {

      this.row = row
      console.log(this.row);
      if (row.switch == false) {
        this.lockPasswordDialogVisible = true
      }
      if (this.switch == true) {
        this.row.lock = 1
        const {data: res} = await this.$http.put("/rc/device/updateDevice", this.row);
        if (res.code == 200) {
          this.$message.success("上锁成功！")
        } else {
          this.$message.error("上锁失败！")
        }
      }
    },


    //确认密码
    async lockPasswordDialogAffirm() {
      if (this.row.lockPassword == this.lockPassword) {
        this.row.lock = 0
       
        //发送后端请求
        const {data: res} = await this.$http.put("/rc/device/updateDevice", this.row);
        if (res.code == 200) {
          console.log(res);
          this.$message.success("关锁成功！")
          this.lockPasswordDialogVisible = false
          this.lockPassword = ""
          await this.getClientList()
        } else {
          this.$message.error("密码校验失败！")
        }
      }

    },


    //客户绑定设备
    bindDevice(row) {
      // console.log(row);
      this.bindDeviceDialogFormVisible = true
      this.selectRow = row
      this.bindForm.clientId = this.selectRow.id
      this.getDeviceNoBindClient()
    },
    //取消绑定的对话框
    bindDeviceDialogCancel() {
      this.bindDeviceDialogFormVisible = false
      this.selectRow = {}
      this.bindForm = {}
    },

    //对话提交
    async bindDeviceAffirm() {
      const {data: res} = await this.$http.post("/rc/client/clientBindDevice", this.bindForm)
      if (res.code === 200) {
        this.$message.success("设备绑定客户成功！")
      } else {
        this.$message.error("设备绑定客户失败！")
      }
      this.bindDeviceDialogCancel()
      await this.getClientList()
    },

    //获取所有的没有绑定客户的设备
    async getDeviceNoBindClient() {
      const {data: res} = await this.$http.post("/rc/device/getDeviceNoBindClient")
      console.log(res);
      if (res.code === 200) {
        this.devicesHasNoClient = res.result
      } else {
        this.$message.error("查询所有没有绑定客户的设备失败！")
      }
    },

    //客户解除设备绑定
    async removeBindDevice(clientId, deviceId) {
      const {data: res} = await this.$http.put("/rc/client/removeBindDevice", {
        clientId: clientId,
        deviceId: deviceId
      })
      if (res.code === 200) {
        this.$message.success(res.message)
      } else {
        this.$message.error(res.message)
      }
      await this.getClientList()
    },
    //删除客户
    async deleteClient(clientId) {
      console.log(clientId);
      const {data: res} = await this.$http.delete("/rc/client/deleteClient", {params: {clientId: clientId}});
      if (res.code == 200) {
        this.$message.success(res.message)
        await this.getClientList()
      } else {
        this.$message.error(res.message)
      }
    },


    //查询所有的客户信息
    async getClientList() {
      const {data: res} = await this.$http.post('/rc/client/getClientInfo', this.query)
      if (res.code === 200 && res.result != null) {
        this.clientList = res.result.list
        console.log(this.clientList);
        this.total = res.result.total
      }
    },
    search() {
      this.getClientList()
    },
    //删除图标的事件
    clearSearch() {
      this.query.key = ""
      this.getClientList()
    },
    add() {
      this.addDialogFormVisible = true
    },

    addDialogCancel() {
      this.addDialogFormVisible = false
      this.addForm = {}
      this.suffixIcon1 = "",
          this.suffixIcon2 = "",
          this.suffixIcon3 = "",
          this.suffixIcon4 = ""
      this.reg = false
      this.$refs.addFormRef.clearValidate()
    },
    async addDialogAffirm() {
      const {data: res} = await this.$http.post("/rc/client/addClient", this.addForm)
      if (res.code == 200) {
        this.$message.success(res.message)
        this.addDialogFormVisible = false
      } else {
        this.$message.error(res.message)
      }

    },

    //验证码按钮获取验证码
    async getAuthCode(code, msg) {
      console.log(code);
      console.log(this.reg);
      if (this.reg) {
        const {data: res} = await this.$http.get('/rc/client/AuthCode?msg=' + msg)
        if (res.code == 200) {
          if (code == '1') {
            this.emailAuthCode = res.result

            console.log(this.emailAuthCode + "====" + code);
          }
          if (code == '2') {
            this.phoneAuthCode = res.result

            console.log(this.phoneAuthCode + "====" + code);
          }
          if (code == '3') {
            this.ccemilAuthCode = res.result
            console.log(this.ccemilAuthCode + "====" + code);
          }
          if (code == '4') {
            this.ccphoneAuthCode = res.result
            console.log(this.ccphoneAuthCode + "====" + code);
          }
          return this.$message.success("验证码发成功")
        }
      }
      return this.$message.error("请输入正确的信息")
    },

    //验证码输入框验证
    inputOnBlur(no, authCode) {
      if (no == '1' && authCode === this.emailAuthCode && this.emailAuthCode != '') {
        this.suffixIcon1 = "iconfont icon-yanzhengtongguo"
        return
      }
      if (no == '1' && authCode != this.emailAuthCode && this.emailAuthCode != '') {
        this.suffixIcon1 = "iconfont icon-yanzhengshibai"
        return
      }

      if (no == '2' && authCode === this.phoneAuthCode && this.phoneAuthCode != '') {
        this.suffixIcon2 = "iconfont icon-yanzhengtongguo"
        return

      }
      if ((no == '2' && authCode != this.phoneAuthCode && this.phoneAuthCode != '')) {
        this.suffixIcon2 = "iconfont icon-yanzhengshibai"
        return
      }


      if (no == '3' && authCode === this.ccemilAuthCode && this.ccemilAuthCode != '') {
        this.suffixIcon3 = "iconfont icon-yanzhengtongguo"
        return
      }
      if (no == '3' && authCode != this.ccemilAuthCode && this.ccemilAuthCode != '') {
        this.suffixIcon3 = "iconfont icon-yanzhengshibai"
        return
      }

      if (no == '4' && authCode === this.ccphoneAuthCode && this.ccphoneAuthCode != '') {
        this.suffixIcon4 = "iconfont icon-yanzhengtongguo"
        return
      }
      if (no == '4' && authCode != this.ccphoneAuthCode && this.ccphoneAuthCode != '') {
        this.suffixIcon4 = "iconfont icon-yanzhengshibai"
        return
      }

    },


    //分页
    handleSizeChange(val) {
      this.query.pageSize = val
      this.getClientList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.query.pageNum = val
      this.getClientList();
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

.div-table {
  margin-top: 0px;

}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>