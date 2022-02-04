<template>
<div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>部门管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card >
      <el-row :gutter="20">
        <el-col :span="8">

          <el-input placeholder="名称或描述查询"  clearable @clear="clearSearch" v-model="queryParams.key">
            <el-button slot="append" icon="el-icon-search" @click="searchDep"></el-button>
          </el-input>

        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addPerm" >添加</el-button>
        </el-col>

        <el-table
            border
            ref="multipleTable"
            :data="deps"
            tooltip-effect="dark"
            style="width: 100%"
           >
          <el-table-column
              type="index"
              width="55">
          </el-table-column>
          <el-table-column
              prop="dep.name"
              label="权限名称"
              width="120">
          </el-table-column>
          <el-table-column
              prop="dep.desc"
              label="部门描述"
              show-overflow-tooltip>
          </el-table-column>

          <el-table-column
              label="角色">
           <template slot-scope="scope">
             <el-tag type="success" v-for="item in scope.row.roles">{{item.name}}</el-tag>
           </template>
          </el-table-column>

          <el-table-column label="操作"width="180">
            <template slot-scope="scope">
              <el-button type="warning" icon="el-icon-edit" size="small" @click="editDep(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteDep(scope.row.dep.id)"></el-button>
              <el-button type="primary" icon="el-icon-user-solid" size="small" @click="searchUser(scope.row.dep.id)"></el-button>
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
  <el-dialog title="添加新的用户信息" :visible.sync="addDialogFormVisible" @close="addDialogCancel">
    <el-form :model="addForm" ref="addForm" :rules="depRules" label-width="100px">
      <el-form-item label="部门名称"  prop="name">
        <el-input  v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="部门描述" prop="desc">
        <el-input v-model="addForm.desc"></el-input>
      </el-form-item>


      <el-form-item label="角色" >
          <el-select v-model="addForm.roleIds" multiple placeholder="请选择" >
            <el-option :label="role.roles.name" :value="role.roles.id"
                       v-for="role in rolesRes" ></el-option>
          </el-select>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addDialogCancel">取 消</el-button>
      <el-button type="primary" @click="addDialogTrue">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 指定部门下的所有用户-->
  <el-dialog title="当前部门下的" :visible.sync="dialogTableVisible" width="60%"  @close="userDialogClose">
    <el-table :data="userOnDep" border stripe>
      <el-table-column property="role.name" label="角色" width="80"></el-table-column>
      <el-table-column property="user.username" label="名称" width="150"></el-table-column>
      <el-table-column property="user.phone" label="手机号" width="200"></el-table-column>
      <el-table-column property="user.email" label="邮箱"></el-table-column>
    </el-table>
    <el-pagination
        small
        layout="prev, pager, next"
        :total="userTotal"
        @current-change="handleCurrentChangeSmall"
    >
    </el-pagination>
  </el-dialog>
  <!--  编辑-->
  <el-dialog title="添加新的用户信息" :visible.sync="editDialogFormVisible" @close="editDialogCancel">
    <el-form :model="editForm" ref="editForm" :rules="depRules" label-width="100px">
      <el-form-item label="编号" >
        <el-input  v-model="editForm.depId" disabled></el-input>
      </el-form-item>
      <el-form-item label="部门名称"  prop="name">
        <el-input  v-model="editForm.depName"></el-input>
      </el-form-item>
      <el-form-item label="部门描述" prop="desc">
        <el-input v-model="editForm.depDesc"></el-input>
      </el-form-item>

      <el-form-item label="角色" >
        <el-select v-model="editForm.rolesId" multiple placeholder="请选择" >
          <el-option :label="role.roles.name" :value="role.roles.id"
                     v-for="role in rolesRes" ></el-option>
        </el-select>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editDialogCancel">取 消</el-button>
      <el-button type="primary" @click="editDialogTrue">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  created() {
    this.getDeps()
  },
  name: "dep",
  data(){
    return{
      depRules:{
        name:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        desc:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ]
      },
      queryParams:{
        key:'',
        pageNo:1,
        pageSize:8
      },
      deps:[],
      total:0,
      addDialogFormVisible:false,
      addForm:{
        name:'',
        desc:'',
        roleIds:[]
      },
      rolesRes:[],

      userOnDep:[],
      dialogTableVisible:false,
      userTotal:0,
      depId:'',

      editDialogFormVisible:false,
      editForm:{
          depId:"",
          depName:"",
          depDesc:"",
          rolesId:[]
      },
      oneDepRoles:[]
    }
  },
  methods:{
    //get all dep
    async getDeps() {
      const {data:res} = await this.$http.get('/sys/dep', {params: this.queryParams})
      if (res.code === 200 && res.result != null) {
        this.deps = res.result.list
        this.total =  res.result.total
        console.log( this.deps);
      }else {
        return this.$message.error(res.message)
      }
    },
    //get all role
    async getRoles(){
      const {data:res} = await this.$http.get('/sys/role', {params: this.queryParams})
      if (res.code === 200 && res.result != null) {
        this.rolesRes = res.result.list
      }else {
        return this.$message.error(res.message)
      }
    },
    //Search dep
    searchDep() {
      this.getDeps()
    },
    clearSearch(){
      this.getDeps()
    },
    //add dep
    addPerm() {
      this.addDialogFormVisible = true
      this.getRoles()
    },
    addDialogCancel(){
      this.addDialogFormVisible = false
      this.$refs.addForm.resetFields()
    },
    async addDialogTrue() {
      const {data: res} = await this.$http.post('/sys/dep', this.addForm)
      if (res.code === 200 && res.result != null) {
        this.$refs.addForm.resetFields()
        await this.getDeps()
        this.addDialogFormVisible = false
        return this.$message.success(res.message)
      } else {
        return this.$message.error(res.message)
      }
    },

    editDep(data){
      this.editDialogFormVisible = true
      this.editForm.depId = data.dep.id
      this.editForm.depName = data.dep.name
      this.editForm.depDesc = data.dep.desc
      this.oneDepRoles = data.roles
      if (data.roles.length !== 0){
        data.roles.forEach(role =>{
          this.editForm.rolesId.push(role.id)
        })
      }
      this.getRoles()
      // console.log(data);
      // console.log(this.editForm);
    },
    editDialogCancel(){
      this.editForm.rolesId = []
      this.editDialogFormVisible = false
    },
    async editDialogTrue() {
      // console.log(this.editForm);
      const {data: res} = await this.$http.put('/sys/dep', this.editForm)
      if (res.code === 200 && res.result != null) {
        await this.getDeps()
        this.editForm.rolesId = []
        this.editDialogFormVisible = false
        return this.$message.success(res.message)
      } else {
        return this.$message.error(res.message)
      }


    },
    // delete more deps
    deleteDep(depId){
      console.log(depId);
      this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: res} = await this.$http.delete('/sys/dep?id=' + depId);
        if (res.code === 200 && res.result != null) {
          await this.getDeps()
          return this.$message.success(res.message)
        }else {
          return this.$message.error(res.message)
        }
      }).catch(() => {
        return this.$message.error("已取消删除！")
      });
    },
    //show user on anyone dep
    async searchUser(depId) {
      this.queryParams.key = depId
      const {data: res} = await this.$http.get('/sys/dep/users', {params:this.queryParams})
      if (res.code === 200 && res.result != null) {
        this.userOnDep = res.result.list
        this.userTotal = res.result.total
      } else {
        return this.$message.error(res.message)
      }
      this.dialogTableVisible = true

    },
    handleSizeChange(val){
      this.queryParams.pageSize = val
      this.getDeps()
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val){
      this.queryParams.pageNo = val
      this.getDeps()
      console.log(`当前页: ${val}`);
    },
    async handleCurrentChangeSmall(val) {
      this.queryParams.pageNo = val
      const {data: res} = await this.$http.get('/sys/dep/users', {params: this.queryParams})
      this.userOnDep = res.result.list
      this.userTotal = res.result.total
      console.log(`当前页: ${val}`);
    },
    userDialogClose(){
      this.queryParams.key = ''
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