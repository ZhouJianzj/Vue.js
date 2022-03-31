<template>
  <div class="login_container">

    <div class="login_box">

      <div class="login-head">
        <img class="touxiang" src="../assets/pig1.png" >
      </div>

      <div class="login_from">
        <el-form  ref="loginFormRef" :model="form"  :rules="rules" class="login_form" >
          <!-- 使用prop添加验证规则 -->
          <el-form-item prop="username"  >
            <!--使用指定的图标，我们这里使用的阿里的图标库，使用规则就是 iconfont开始 后面更上图标的点之后的name-->
            <el-input  v-model="form.username" prefix-icon="iconfont icon-icon-yonghu"></el-input>
          </el-form-item>

          <el-form-item prop="password" >
            <el-input  v-model="form.password" type="password" prefix-icon="iconfont icon-tianchongxing-"></el-input>
          </el-form-item>

          <el-form-item  >
            <el-button type="info" @click="reset">重置</el-button>
            <el-button type="primary"  @click="submit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>


    <img class="bg_pic" :src="picPath">

  </div>

</template>

<script>
export default {
  name: "login",
  data(){
    return{
      picPath:require("../assets/gk1.jpg"),
      form:{
        username:'zhoujian',
        password:'123321'
      },
      // 验证规则属性,使用到rules和prop,需要和标签绑定的数据名字一致
      rules:{
        username:[
          { required: true, message: '请输入用户名！', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      },
      result:{}
    }
  },
  methods:{
    submit(){
      this.$refs.loginFormRef.validate(async valid =>{
        if (!valid) return
        const {data:result} = await this.$http.post("/sys/login",this.form);
        if (result.code === 200 && result.result != null){
          window.sessionStorage.setItem("token",result.result.token)
          // console.log(result.result);
          window.sessionStorage.setItem("id",result.result.user.id)
          window.sessionStorage.setItem("username",encodeURIComponent(result.result.user.username))
          window.sessionStorage.setItem("phone",result.result.user.phone)
          window.sessionStorage.setItem("email",result.result.user.email)
          await this.$router.push("/home")
          this.result = result
          return this.$message.success(result.message + "欢迎回来！")
        }else {
          return this.$message.error(result.message)
        }
      })
    },

    reset(){
      this.$refs.loginFormRef.resetFields()
    }
  }

}
</script>

<style scoped >
.bg_pic{
  /*z-index:-1;*/
  /*position: absolute;*/
  /*width: 1920px;*/
  /*height: 1080px;*/
}

  .login_container{

    /*background-color: #2c3e50;*/
    height: 100%;
  }
  .login_box{
    /*z-index:1;*/
    /*position: absolute;*/

    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    /* 设置盒子的位置为中间位子 */
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .login-head{
    height: 100px;
    width: 100px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 2px;
    box-shadow: 0 0  10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
  }
.touxiang {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
  .login_form{
    position: absolute;
    bottom: 0;
    width: 380px;
    padding: 0px 20px;
    box-sizing: border-box;
    left: 50%;
    top: 55%;
    transform: translate(-50%,-50%);
  }
</style>