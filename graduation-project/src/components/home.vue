<template>

  <el-container class="home_container">
    <el-header>
      <div>
        <img src="../assets/pig1.png">
        <span>港机视频监控和远程控制界面</span>
      </div>
      <el-button @click="logout">退出</el-button>
    </el-header>

    <el-container>

      <el-aside width="200px">
        <el-menu background-color="#001624" text-color="#fff" active-text-color="#ffd04b" >

          <el-submenu :index="menu.id + ' '" style="text-align: left" v-for="menu in menus" :key="menu.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ menu.menuName }}</span>
            </template>

              <el-menu-item :index="item.id + ' ' "  v-for="item in menu.children" :key="item.id" >
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{ item.menuName }}</span>
                </template>
              </el-menu-item>


          </el-submenu>

        </el-menu>
      </el-aside>

      <el-main>Main</el-main>

    </el-container>
  </el-container>


</template>

<script>
export default {
  async created() {
    const {data:menus} = await this.$http.get('/sys/menu');
    this.menus = menus.result
  },
  name: "home",
  data(){
    return{
      menus:{}
    }
  },
  methods:{
    logout(){
      window.sessionStorage.clear()
      this.$router.push('/sys/login')
      this.$message.info("已退出登录！")
    }
  }
}
</script>

<style scoped>
.el-header{
  background-color: #001624;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #f5f2f0;
  font-size: 20px;
}
div{
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
  background-color: #001624;
}
.home_container{
  height: 100%;
}
</style>