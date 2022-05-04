<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>远程控制</el-breadcrumb-item>
      <el-breadcrumb-item>监控画面</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card >
<!--      <iframe    style="height: 100vh;width: 100%" src="http://10.90.15.202/vision/cloudconfig/custom/previews/display.html?tag=displays/demo-app-zj/%E7%9B%91%E6%8E%A7%EF%BC%881%EF%BC%89.json&visionId=693776110701248512"></iframe>-->
      <div id="video-container"></div>

    </el-card>
  </div>
</template>

<script>

import  EZUIKit from 'ezuikit-js';
export default {
  name: "history",
  created() {
    const player = new EZUIKit.EZUIKitPlayer({
      id: 'video-container', // 视频容器ID
      width: 600,
      height: 400,
      accessToken: 'at.e0hqo3pedf1bq0xa3z97okzn7pbv6i2d-2vdqxghxmf-05gdsc1-ot2rbrijc',
      url: 'ezopen://open.ys7.com/G39444019/1.rec'
    })
  },
  data(){
    return{

    }
  },
  methods:{

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