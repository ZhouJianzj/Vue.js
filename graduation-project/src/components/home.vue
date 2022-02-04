<template>

  <el-container class="home_container">
    <el-header>
      <div class="head_pic">
        <img src="../assets/pig1.png">
        <span>港机视频监控和远程控制界面</span>
      </div>
      <el-button @click="logout" style="">退出</el-button>
    </el-header>

    <el-container>

      <el-aside :width="isCollapse? '64px': '200px'">
        <div class="toggle-button" @click="isCollapse_method" >...</div>
        <el-menu background-color="#222222" text-color="#fff" active-text-color="#ffd04b"
                 :unique-opened="true" :collapse="isCollapse"
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
    return{
      menus:{},
      menus_icon:{
        "1":"iconfont icon-xitongguanli",
        "7":"iconfont icon-yuanchengkongzhi",
        "11":"iconfont icon-shipinjiankong",
    },
      isCollapse:false,
      isActive:""
    }
  },
  methods:{
    async getMenu(){
      const {data:menus} = await this.$http.get('/sys/menu');
      this.menus = menus.result
    },
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