<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card >
      <el-row :gutter="20">
        <el-col :span="8">

          <el-input placeholder="权限名称查询"  clearable @clear="getPerms" v-model="queryParams.key">
            <el-button slot="append" icon="el-icon-search" @click="searchPerm"></el-button>
          </el-input>

        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addPerm" >添加</el-button>
        </el-col>
        <el-col :span="4">
          <el-button  type="info" @click="toggleSelection()">取消选择</el-button>
        </el-col>
        <el-col :span="4">
          <el-button  type="danger" @click="deletePerms">批量删除</el-button>
        </el-col>
      <el-table
          border
          ref="multipleTable"
          :data="perms"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
           type="index"
            width="120">
        </el-table-column>
        <el-table-column
            prop="name"
            label="权限名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="route"
            label="路由名称"
            show-overflow-tooltip >
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning" icon="el-icon-edit" size="small" @click="editPerm(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="deletePerm(scope.row.id)"></el-button>
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
    <!--    添加-->
    <el-dialog title="添加权限信息" :visible.sync="addDialogFormVisible"
               @close="addDialogCancel">
      <el-form :model="perm" ref="addPermForm"  label-width="70px">
        <el-form-item label="权限名称"  >
          <el-input v-model="perm.name"></el-input>
        </el-form-item>
        <el-form-item label="前端路由"  >
          <el-input v-model="perm.route"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogCancel">取 消</el-button>
        <el-button type="primary" @click="addDialogTrue">确 定</el-button>
      </div>
    </el-dialog>

<!--    修改-->
    <el-dialog title="用户信息" :visible.sync="editDialogFormVisible"
               @close="editDialogFormVisible = false">
      <el-form :model="perm" ref="editPermForm"  label-width="70px">
        <el-form-item label="编号"  >
          <el-input  v-model="perm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="权限名称"  >
          <el-input v-model="perm.name"></el-input>
        </el-form-item>
        <el-form-item label="前端路由"  >
          <el-input v-model="perm.route" disabled></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogTrue">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getPerms()
    },
  name: "perm",
  data(){
    return{
      perms:[],
      perm:{},
      permId:{
        id:''
      },
      queryParams:{
        key:"",
        pageNo:1,
        pageSize:8
      },
      total:0,
      editDialogFormVisible: false,
      addDialogFormVisible:false,
      multipleSelection: [],
      permIds:{
        ids:[]
      }
    }
  },
  methods: {
    //查询所有的权限
    async getPerms(){
      const {data:result} = await this.$http.get('/sys/perm',{params:this.queryParams})
      this.perms = result.result.list
      this.total = result.result.total
    },
    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.getPerms()
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.queryParams.pageNo = val
      this.getPerms()
      console.log(`当前页: ${val}`);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  //  搜索按钮
    searchPerm() {
       this.getPerms()
     },
    editPerm(data) {
      this.editDialogFormVisible = true
      this.perm = data
    },
    async editDialogTrue() {
      const {data: result} = await this.$http.put('/sys/perm', this.perm)
      if (result.code === 200 && result.result != null){
        this.editDialogFormVisible = false
        await this.getPerms()
        return this.$message.success(result.message)
      }else {
        return this.$message.error(result.message)
      }
    },
    addPerm(){
      this.perm = {}
      this.addDialogFormVisible = true
      console.log(this.multipleSelection);
    },
    addDialogCancel() {
      this.addDialogFormVisible = false
    },
    async addDialogTrue() {
      this.addDialogFormVisible = true
      const {data: result} = await this.$http.post('/sys/perm', this.perm)
      if (result.code === 200 && result.result != null) {
        this.addDialogFormVisible = false
        await this.getPerms()
        return this.$message.success(result.message)
      } else {
        return this.$message.error(result.message)
      }
    },
    async deletePerm(permId) {
      this.permId.id = permId
      // this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(async () => {
      //   const {data: res} = await this.$http.delete('/sys/perm', {params: this.permId +"d"});
      //   if (res.code === 200 && res.result != null) {
      //     await this.getPerms()
      //     return this.$message.success(res.message)
      //   }
      // }).catch(() => {
      //   return this.$message.error("已取消删除！")
      // });
      const messageBoxDataPromise = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err);
      if (messageBoxDataPromise == "confirm") {
        const {data: res} = await this.$http.delete('/sys/perm', {params: this.permId });
        if (res.code === 200 && res.result != null) {
          await this.getPerms()
          return this.$message.success(res.message)
        }else {
          return this.$message.error(res.message)
        }
      } else {
        return this.$message.info("已取消删除！")
      }
    },
    async deletePerms() {

      if (this.multipleSelection) {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.permIds.ids.push(this.multipleSelection[i].id)
        }
        let urlChild = ''
        this.permIds.ids.forEach((id) => {//类似for(id:ids),ids就是被塞满id值的数组
          urlChild += "ids=" + id + "&";
        });
        urlChild = urlChild.substring(0, urlChild.lastIndexOf("&"));//最后一个&删掉

        const {data: result} = await this.$http.delete('/sys/perm/more?' +urlChild )
        if (result.code === 200 && result.result != null) {
          this.addDialogFormVisible = false
          await this.getPerms()
          return this.$message.success(result.message)
        } else {
          return this.$message.error(result.message)
        }
      } else {
        this.$message.info("没有选择需要删除的权限！");
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