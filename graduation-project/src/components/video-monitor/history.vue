<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>远程控制</el-breadcrumb-item>
      <el-breadcrumb-item>监控画面</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div align="left" id="video-container"></div>
    </el-card>
    <!--      <div>-->
    <!--        <button onClick="play()">play</button>-->
    <!--        <button onClick="stop()">stop</button>-->
    <!--        <button onClick="getOSDTime()">getOSDTime</button>-->
    <!--        <button onClick="getOSDTime2()">getOSDTime2</button>-->
    <!--        <button onClick="capturePicture()">capturePicture</button>-->
    <!--        <button onClick="openSound()">openSound</button>-->
    <!--        <button onClick="closeSound()">closeSound</button>-->
    <!--        <button onClick="startSave()">startSave</button>-->
    <!--        <button onClick="stopSave()">stopSave</button>-->
    <!--        <button onClick="ezopenStartTalk()">开始对讲</button>-->
    <!--        <button onClick="ezopenStopTalk()">结束对讲</button>-->
    <!--        <button onClick="fullScreen()">全屏</button>-->
    <!--      </div>-->

  </div>
</template>

<script>

import EZUIKit from 'ezuikit-js';

var player = null;
export default {
  name: "history",

  mounted: () => {
    console.group("mounted 组件挂载完毕状态===============》");
    fetch('https://open.ys7.com/jssdk/ezopen/demo/token')
        .then(response => response.json())
        .then(res => {
          var accessToken = res.data.accessToken;
          player = new EZUIKit.EZUIKitPlayer({
            id: "video-container", // 视频容器ID
            accessToken: accessToken,
            url: "ezopen://open.ys7.com/C78957921/1.live",
            template: 'theme',//
            autoplay: true,
            plugin: ['talk'],// 加载插件，talk-对讲
            startTalk:()=> this.playr.startTalk(),
            stopTalk: ()=> this.playr.stopTalk(),
            width: 400,
            height:266,
          });
        });
  },

  data() {
    return {}
  },

  methods: {},

}
</script>

<style scoped>
.panel-top {
  display: inline-block;
  height: 48px;
  width: 600px;
  /* width: 1200px; */
  background: #3d3d3d;
  vertical-align: top;
  position: relative;
  text-align: left;
}

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
</style>