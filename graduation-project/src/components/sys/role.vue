<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card >
      <el-row :gutter="20">
        <el-col :span="8">

          <el-input placeholder="名称或描述查询"  clearable @clear="clearSearch" v-model="queryParams.key">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>

        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="add" >添加</el-button>
        </el-col>

        <el-table border ref="multipleTable" :data="rolesResult.list" tooltip-effect="dark" style="width: 100%">

          <el-table-column type="expand" width="55">
            <template slot-scope="scope">
              <pre> <el-tag type="danger" v-for="item in scope.row.perms">{{item.name}}</el-tag></pre>
            </template>
          </el-table-column>

          <el-table-column
              type="index"
              width="55">
          </el-table-column>

          <el-table-column
              prop="roles.name"
              label="角色名称"
              width="120">
          </el-table-column>

          <el-table-column
              label="权限名称">
            <template slot-scope="scope">
              <el-tag type="success" v-for="item in scope.row.perms">{{item.name}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作"width="180">
            <template slot-scope="scope">
              <el-button type="warning" icon="el-icon-edit" size="small" @click="edit(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteRole(scope.row.roles.id)"></el-button>
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

<!--添加-->
    <el-dialog title="添加新的角色信息" :visible.sync="addDialogFormVisible" @close="addDialogCancel">
      <el-form :model="addForm" ref="addForm" :rules="depRules" label-width="100px">
        <el-form-item label="角色名称"  prop="name">
          <el-input  v-model="addForm.name"></el-input>
        </el-form-item>

        <el-form-item label="权限" >
          <el-select v-model="addForm.permsId" multiple placeholder="请选择" >
            <el-option :label="perm.name" :value="perm.id"
                       v-for="perm in permsResult" ></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogCancel">取 消</el-button>
        <el-button type="primary" @click="addDialogTrue">确 定</el-button>
      </div>
    </el-dialog>


    <!--编辑-->
    <el-dialog title="编辑角色信息" :visible.sync="editDialogFormVisible" @close="editDialogCancel">
      <el-form :model="editForm" ref="editForm" :rules="depRules" label-width="100px">
        <el-form-item label="编号"  >
          <el-input  v-model="editForm.roleId" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称"  prop="roleName">
          <el-input  v-model="editForm.roleName"></el-input>
        </el-form-item>

        <el-form-item label="权限" >
          <el-select v-model="editForm.permsId" multiple placeholder="请选择" >
            <el-option :label="perm.name" :value="perm.id"
                       v-for="perm in permsResult" ></el-option>
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
import perm from "./perm";

export default {
  created() {
    this.getRoles()
    // this.getPerms()
  },
  name: "role",
  data(){
    return{
      depRules:{
        name:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        roleName:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      },
      queryParams:{
        key:'',
        pageNo:1,
        pageSize:8
      },
      total:0,
      rolesResult:{},

      addDialogFormVisible:false,
      addForm:{
        name:'',
        permsId:[]
      },
      permsResult:[],
      selectedPermsId:[],

      editDialogFormVisible:false,
      editForm:{
        roleId:'',
        roleName:'',
        permsId:[]
      }
    }
  },
  methods:{
    async getRoles() {
      const {data: res} = await this.$http.get('/sys/role', {params:this.queryParams})
      if (res.code === 200 && res.result != null) {
        this.rolesResult = res.result
        this.total = res.result.total
        // console.log(this.rolesResult);
      } else {
        return this.$message.error(res.message)
      }
    },
    async getPerms() {
      this.queryParams.pageNo = 0
      this.queryParams.pageSize = 0
      const {data: result} = await this.$http.get('/sys/perm', {params: this.queryParams})
      this.permsResult = result.result.list
      this.queryParams.pageNo = 1
      this.queryParams.pageSize = 8
    },
    clearSearch(){
      this.getRoles()
    },
    search() {
      this.getRoles()
    },

    add(){
      this.addDialogFormVisible = true
      this.getPerms()
    },
    addDialogCancel(){
      this.$refs.addForm.resetFields()
      this.addForm = {}
      this.addDialogFormVisible = false
    },
    addDialogTrue(){
      this.$refs.addForm.validate(async valid => {
        if (!valid) return this.$message.error("信息有误")
        const {data: res} = await this.$http.post('/sys/role', this.addForm)
        if (res.code === 200 && res.result != null) {
          this.addDialogCancel()
          await this.getRoles()
          return this.$message.success(res.message)
        } else {
          return this.$message.error(res.message)
        }
      })

    },

    edit(data){
      this.editForm.roleId = data.roles.id
      this.editForm.roleName = data.roles.name
       data.perms.forEach(perm =>{
         this.editForm.permsId.push(perm.id)
       })
      this.getPerms()
      this.editDialogFormVisible = true
      console.log(data);
    },
    editDialogCancel(){
      this.$refs.editForm.resetFields()
      this.editForm.permsId = []
      this.editDialogFormVisible = false
    },
    editDialogTrue(){
      this.$refs.editForm.validate(async valid => {
        if (!valid) return this.$message.error("信息有误")
        const {data: res} = await this.$http.put('/sys/role', this.editForm)
        if (res.code === 200 && res.result != null) {
          this.editDialogCancel()
          await this.getRoles()
          return this.$message.success(res.message)
        } else {
          return this.$message.error(res.message)
        }
      })

    },


    deleteRole(roleId){
      this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        console.log(roleId);
        const {data: res} = await this.$http.delete('/sys/role',{params:{id:roleId}});
        if (res.code === 200 && res.result != null) {
          await this.getRoles()
          return this.$message.success(res.message)
        }else {
          return this.$message.error(res.message)
        }
      }).catch(() => {
        return this.$message.error("已取消删除！")
      });
    },

    handleSizeChange(val){
      this.queryParams.pageSize = val
      this.getRoles()
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val){
      this.queryParams.pageNo = val
      this.getRoles()
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
.el-tag{
  margin: 7px;
}
</style>