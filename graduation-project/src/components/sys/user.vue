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

          <el-input placeholder="手机号或用户名或邮箱或员工编号查询" v-model="queryParams.key"
                    clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
          </el-input>

      </el-col>
      <el-col :span="4">

          <el-button type="primary" @click="addUser">添加</el-button>

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
              label="用户名"
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
              width="180">
          </el-table-column>
          <el-table-column
              prop="dep.desc"
              label="部门描述"
              >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="warning" icon="el-icon-edit" size="small" @click="editUser(scope.row)"></el-button>
                <el-button type="primary" icon="el-icon-share" size="small"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteUser(scope.row.userId)"></el-button>
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
<!--  添加用户的dialog-->
  <el-dialog title="添加新的用户信息" :visible.sync="addUserDialogFormVisible" @close="addUserDialogCancel">
    <el-form :model="addUserForm" ref="addUserForm" :rules="addUserRules" label-width="70px">
      <el-form-item label="用户名" prop="username" >
        <el-input  v-model="addUserForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" >
        <el-input v-model="addUserForm.password"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone" >
        <el-input v-model="addUserForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" >
        <el-input v-model="addUserForm.email"></el-input>
      </el-form-item>

      <el-form-item label="部门"   style="width: 200px">


          <el-select v-model="depId" placeholder="请选择">
            <el-option :label="item.dep.name" :value="item.dep.id"
                       v-for="item in depAndRoleResult" :key="item.dep.name">
            </el-option>
          </el-select>
      </el-form-item>

      <el-form-item label="角色"  style="width: 200px">
        <el-select v-model="addUserForm.roleId" placeholder="请选择">
          <el-option :label="item.name" :value="item.id"
                     v-for="item in roles" ></el-option>
        </el-select>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addUserDialogCancel">取 消</el-button>
      <el-button type="primary" @click="addUserDialogTrue">确 定</el-button>
    </div>
  </el-dialog>

  <!-- 编辑用户的dialog-->
  <el-dialog title="添加新的用户信息" :visible.sync="editDialogFormVisible" @close="editUserDialogCancel">
    <el-form :model="editUserForm" ref="editUserForm" :rules="addUserRules" label-width="70px">
      <el-form-item label="用户名" prop="username" >
        <el-input  v-model="editUserForm.username"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone" >
        <el-input v-model="editUserForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" >
        <el-input v-model="editUserForm.email"></el-input>
      </el-form-item>

      <el-form-item label="部门"   style="width: 200px">
        <el-select v-model="depId" placeholder="请选择" >
          <el-option :label="item.dep.name" :value="item.dep.id"

                     v-for="item in depAndRoleResult" :key="item.dep.name">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="角色"  style="width: 200px">
        <el-select v-model="addUserForm.roleId" placeholder="请选择">
          <el-option :label="item.name" :value="item.id"
                     v-for="item in roles" >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="editUserDialogCancel">取 消</el-button>
      <el-button type="primary" @click="editUserDialogTrue">确 定</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
export default {
  created() {
    this.getUserList()
  },
  name: "user",
  data(){
    //自定义的校验规则
    const checkEmail = (rule, value, callback) => {
      const  regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      const reg =  regEmail.test(value)
      if (!reg) callback(new Error('请输入正确的邮箱'))
      callback()
    }
    const checkModel = (rule, value, callback) => {
      const regModel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      const reg =  regModel.test(value)
      if (!reg) callback(new Error("请输入正确的手机号"))
      callback()
    }

    return{
      queryParams: {
        key: '',
        pageNo: 1,
        pageSize: 8,
      },
      resultUserList:[],
      total:0,

      queryDepAndRole:{
        key: '',
        pageNo: '',
        pageSize: '',
      },
      depAndRoleResult:{},
      addUserDialogFormVisible:false,
      addUserForm:{
        username:'',
        password:'',
        phone:'',
        email:'',
        depId:'',
        roleId:'',
      },
      depId:'',
      roles:[],
      addUserRules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        phone:[
          { required: true, message: '请输入手机号', trigger: 'blur' },
          //配置自定义的验证规则
          {validator:checkModel , trigger: 'blur' }
        ],
        email:[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {validator:checkEmail, trigger: 'blur' }
        ]
      },


      editDialogFormVisible:false,
      editUserForm:{
        id:"",
        username:"",
        phone:"",
        email:"",
        depId:"",
        roleId:""
      },

      deleteDialogVisible:false,
      userId:{
        id:''
      }

    }
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
    },
    //用户搜索
    searchUser(){
       this.getUserList();
    },
    //用户添加点击按钮
    async addUser() {
      this.addUserDialogFormVisible = true
      const {data:depAndRole} = await this.$http.get('/sys/dep', {params: this.queryDepAndRole});
      this.depAndRoleResult = depAndRole.result
      console.log(this.depAndRoleResult)
    },
    //dialog 取消添加按钮
    addUserDialogCancel(){
      this.addUserDialogFormVisible = false
      this.$refs.addUserForm.resetFields()
    },
    //dialog 确认添加按钮
    addUserDialogTrue(){
        this.$refs.addUserForm.validate(async valid =>{
          if (!valid) return this.$message.error("信息有误")
          const {data:result} = await this.$http.post("/sys/user",this.addUserForm);
          if (result.code === 200 && result.result != null){
            this.addUserDialogFormVisible = false
            this.getUserList()
            return this.$message.success(result.message)
          }else {
            return this.$message.error(result.message)
          }
        })
    },
  // 用户编辑
    async editUser(user) {
      const {data: depAndRole} = await this.$http.get('/sys/dep', {params: this.queryDepAndRole});
      this.depAndRoleResult = depAndRole.result
      this.editDialogFormVisible = true
      this.editUserForm.id = user.user.id
      this.editUserForm.username = user.user.username
      this.editUserForm.phone = user.user.phone
      this.editUserForm.email = user.user.email
      this.editUserForm.depId = user.user.depId
      this.depId = user.user.depId
      this.editUserForm.roleId = user.user.roleId
      this.addUserForm.roleId = user.user.roleId
    },
    editUserDialogCancel(){
      this.$refs.editUserForm.resetFields()
      this.editDialogFormVisible = false
    },
    async editUserDialogTrue() {
      this.editUserForm.depId = this.depId
      this.editUserForm.roleId = this.addUserForm.roleId
      const {data:result} = await this.$http.put('/sys/user/modify',  this.editUserForm)
      if (result.code === 200 && result.result != null){
        this.editUserDialogCancel()
        this.getUserList()
        return this.$message.success(result.message)
      }else {
        this.editUserDialogCancel()
        return this.$message.error(result.message)
      }

    },
  // 用户删除
    deleteUser(userId){
      this.userId.id = userId
      this.deleteDialogVisible =true
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: res} = await this.$http.delete('/sys/user', {params: this.userId});
        if (res.code === 200 && res.result != null) {
          this.deleteDialogVisible = false
          this.getUserList()
          return this.$message.success(res.message)
        }
      }).catch(() => {
        return this.$message.error(res.message)
      });

    }
  },
watch:{
  depId:function (newVal){
    console.log(newVal)
    this.addUserForm.depId = newVal
    for (let i = 0; i < this.depAndRoleResult.length; i++) {
      if (this.depAndRoleResult[i].dep.id === newVal){

        if (this.depAndRoleResult[i].roles.length != 0){
          this.roles = this.depAndRoleResult[i].roles
        }else {
          this.roles = []
          this.addUserForm.roleId = ''
        }
      }
    }
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