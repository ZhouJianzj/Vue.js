<template>

  <el-container class="home_container">
    <el-header>
      <div class="head_pic">
        <img src="../assets/pig1.png">
        <span>港机视频监控和远程控制界面</span>

      </div>

<div class="head_pic">
    <el-menu class="el-menu-demo" mode="horizontal">
        <el-submenu index="2" >
          <template slot="title">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </template>
            <el-menu-item index="2-1" >
              <el-button  size="mini" @click="modifyMessage">修改信息</el-button>
            </el-menu-item>

            <el-menu-item index="2-2" >
              <el-button  size="mini" @click="modifyPassword">修改密码</el-button>
            </el-menu-item>

            <el-menu-item index="2-3">
              <el-button size="mini" @click="logout" >退出登录</el-button>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</div>

    </el-header>

    <el-container>

      <el-aside :width="isCollapse? '64px': '200px'">
        <div class="toggle-button" @click="isCollapse_method" >...</div>
        <el-menu background-color="#222222"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 :unique-opened="true"
                 :collapse="isCollapse"
                 :collapse-transition="false" 
                 :router="true"
                 :default-active=isActive
                >

          <el-submenu :index="menu.id + ''" style="text-align: left" v-for="menu in menus" :key="menu.id">
            <template slot="title">
              <i :class = menus_icon[menu.id]></i>
              <span>{{ menu.menuName }}</span>
            </template>

              <el-menu-item  @click="saveActivePath(item.route)" :index="item.route + '' "
                             v-for="item in menu.children" :key="item.id" >
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{ item.menuName }}</span>
                </template>

              </el-menu-item>

          </el-submenu>

        </el-menu>
      </el-aside>

      <!--      右边内容区-->
      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>
    <!--编辑-->
    <el-dialog title="编辑角色信息" :visible.sync="editDialogFormVisible" @close="editDialogCancel">
      <el-form :model="editForm" ref="editForm" :rules="Rules" label-width="100px">
        <el-form-item label="用户名"  prop="username">
          <el-input  v-model="editForm.username" ></el-input>
        </el-form-item>
        <el-form-item label="手机号"  prop="phone">
          <el-input  v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"  prop="email">
          <el-input  v-model="editForm.email"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogCancel">取 消</el-button>
        <el-button type="primary" @click="editDialogTrue">确 定</el-button>
      </div>
    </el-dialog>

    <!--密码-->
    <el-dialog title="编辑角色信息" :visible.sync="passwordDialogFormVisible" @close="passwordDialogCancel">
      <el-form :model="passwordForm" ref="passwordForm" :rules="Rules" label-width="100px">
        <el-form-item label="旧密码"  prop="oldPassword">
          <el-input type="password" v-model="passwordForm.oldPassword" ></el-input>
        </el-form-item>
        <el-form-item  label="新密码"  prop="newPassword">
          <el-input type="password" v-model="passwordForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码"  prop="newPassword">
          <el-input type="password" v-model="newPassword"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="passwordDialogCancel">取 消</el-button>
        <el-button type="primary" @click="passwordDialogTrue">确 定</el-button>
      </div>

    </el-dialog>
  </el-container>



</template>

<script>
export default {
   created() {
     this.activePath()
     this.getMenu()
  },
  name: "home",
  data(){
    //自定义的校验规则
    const checkEmail = (rule, value, callback) => {
      const  regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      const reg =  regEmail.test(value)
      if (!reg) callback(new Error('请输入正确的邮箱'))
      callback()
    }
    const checkPhone = (rule, value, callback) => {
      const regModel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      const reg =  regModel.test(value)
      if (!reg) callback(new Error("请输入正确的手机号"))
      callback()
    }
    return{
      Rules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        phone:[
          { required: true, message: '请输入手机号', trigger: 'blur' },
          //配置自定义的验证规则
          {validator:checkPhone , trigger: 'blur' }
        ],
        email:[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {validator:checkEmail, trigger: 'blur' }
        ],
        oldPassword:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        newPassword:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      },
      menus:{},
      menus_icon:{
        "1":"iconfont icon-xitongguanli",
        "7":"iconfont icon-yuanchengkongzhi",
        "11":"iconfont icon-shipinjiankong",
    },
      isCollapse:false,
      isActive:"",

      editDialogFormVisible:false,
      editForm:{
        id:'',
        username:'',
        phone:'',
        email:'',
        depId:'',
        roleId:''
      },

      passwordDialogFormVisible:false,
      passwordForm:{
        id:'',
        oldPassword:'',
        newPassword:''
      },
      newPassword:'',

    }
  },
  methods:{
    async getMenu(){
      const {data:menus} = await this.$http.get('/sys/menu');
      this.menus = menus.result
    },
    modifyMessage(){
      this.editForm.id = window.sessionStorage.getItem("id");
      //编码解码的问题出现在中文用户名的时候，再修改的时候出现IOS问题
      this.editForm.username = decodeURIComponent(window.sessionStorage.getItem("username"))
      this.editForm.phone = window.sessionStorage.getItem("phone");
      this.editForm.email = window.sessionStorage.getItem("email");
      this.editDialogFormVisible = true
    },
    editDialogCancel(){
      this.editDialogFormVisible = false
    },
    editDialogTrue(){
      this.$refs.editForm.validate( async vail =>{
        if (!vail) return this.$message.error("信息有误")
        const {data:res} = await this.$http.put('/sys/user/modify',this.editForm);
        if (res.code === 200 && res.result != null){
          window.sessionStorage.clear()
          this.$router.push('/login')
          return this.$message.success(res.message + "请重新登录！")
        }else {
          return this.$message.error(res.message)
        }
      })
      this.editDialogFormVisible = false
    },

    modifyPassword(){
      this.passwordDialogFormVisible = true;
      this.passwordForm.id = window.sessionStorage.getItem("id")
    },
    passwordDialogTrue(){
      this.$refs.passwordForm.validate(async  vail =>{
        if (!vail) return this.$message.error("信息有误")
        if (this.passwordForm.newPassword === this.newPassword) {
          const {data:res} = await this.$http.put('/sys/user/password',this.passwordForm);
          if (res.code === 200 && res.result != null){
            window.sessionStorage.clear()
            this.$router.push('/login')
            return this.$message.success(res.message + "请重新登录！")
          }else {
            return this.$message.error(res.message)
          }
        }else{
          return this.$message.error("两次输入的新密码不一致！")
        }
      })
      this.passwordDialogCancel()
    },
    passwordDialogCancel(){
      this.$refs.passwordForm.resetFields()
      this.newPassword = ''
      this.passwordForm = {}
      this.passwordDialogFormVisible = false;
    },
    // 用户退出登录
    logout(){
      window.sessionStorage.clear()
      this.$router.push('/login')
      this.$message.info("已退出登录！")
    },
    isCollapse_method(){
      this.isCollapse = !this.isCollapse
    },
    //保存每次用户选择的route为了刷新页面的时候不丢失之前的菜单状态
    //1、先组件触发时间传递route来
    //2、保存route到sessionStorage中
    //3、每次页面加载的时候到sessionStorage中获取activePath
    saveActivePath(activePath){
      window.sessionStorage.setItem("activePath",activePath)
    },
    activePath(){
      this.isActive = window.sessionStorage.getItem("activePath")
    }
  }
}
</script>

<style scoped>

.el-header{
  background-color: #333333;
  display: flex;
  /*两边对齐*/
  justify-content: space-between;

  text-align: center;
  color: #fff;
}
.head_pic{
  display: flex;
  align-items: center;


}
span{
  margin-left: 15px;
}
.el-main{
  background-color: #b3d4fc;
}
.el-aside{
  background-color: #222222;
}
.el-menu{
  border-right: none;
}
.home_container{
  height: 100%;
}
/*折叠*/
.toggle-button{
  line-height: 22px;
  color: #b3d4fc;
  /*指定文本间的间距大小*/
  letter-spacing: 0.2em;
  /*指定光标为一个小手*/
  cursor: pointer;
  align-items: center;
}
</style>