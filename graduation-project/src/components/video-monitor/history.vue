<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>远程控制</el-breadcrumb-item>
      <el-breadcrumb-item>监控画面</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!--      <iframe    style="height: 100vh;width: 100%" src="http://10.90.15.202/vision/cloudconfig/custom/previews/display.html?tag=displays/demo-app-zj/%E7%9B%91%E6%8E%A7%EF%BC%881%EF%BC%89.json&visionId=693776110701248512"></iframe>-->
      <div id="video-container" style="width:600px;"></div>
      <div>
        <button onClick="play()">play</button>
        <button onClick="stop()">stop</button>
        <button onClick="getOSDTime()">getOSDTime</button>
        <button onClick="getOSDTime2()">getOSDTime2</button>
        <button onClick="capturePicture()">capturePicture</button>
        <button onClick="openSound()">openSound</button>
        <button onClick="closeSound()">closeSound</button>
        <button onClick="startSave()">startSave</button>
        <button onClick="stopSave()">stopSave</button>
        <button onClick="ezopenStartTalk()">开始对讲</button>
        <button onClick="ezopenStopTalk()">结束对讲</button>
        <button onClick="fullScreen()">全屏</button>
      </div>
    </el-card>
  </div>
</template>

<script>

import EZUIKit from 'ezuikit-js';

export default {
  name: "history",

  created() {
    this.init()

    // var player1 = new EZUIKit.EZUIKitPlayer({
    //   id: 'video-container', // 视频容器ID
    //   width: 600,
    //   height: 400,
    //   accessToken: 'at.47b7ia4ib6523rxqag2uz22rcstqnlrp-32gz16dls6-1in2hwj-vpcongym9',
    //   url: 'ezopen://open.ys7.com/G39444019/1.rec'
    // })
  },
  data() {
    return {
      player: {}
    }
  },
  methods: {
    init() {
      this.player = new EZUIKit.EZUIKitPlayer({
        id: 'video-container', // 视频容器ID
        accessToken: 'at.47b7ia4ib6523rxqag2uz22rcstqnlrp-32gz16dls6-1in2hwj-vpcongym9',
        url: 'ezopen://open.ys7.com/G82446190/1.hd.live',
        // template: 'standard',
        width: 600,
        height: 400,
      })
    },

    fullScreen() {
      var playPromise = this.fullScreen();
      playPromise.then((data) => {
        console.log("promise 获取 数据", data)
      })
    },
    play() {
      var playPromise = playr.play();
      playPromise.then((data) => {
        console.log("promise 获取 数据", data)
      })
    },
    stop() {
      var stopPromise = playr.stop();
      stopPromise.then((data) => {
        console.log("promise 获取 数据", data)
      })
    },
    getOSDTime() {
      var getOSDTimePromise = playr.getOSDTime();
      getOSDTimePromise.then((data) => {
        console.log("promise 获取 数据", data)
      })
    },
    getOSDTime2() {
      var getOSDTimePromise = playr2.getOSDTime();
      getOSDTimePromise.then((data) => {
        console.log("promise 获取 数据", data)
      })
    },
    capturePicture() {
      var capturePicturePromise = playr.capturePicture();
      capturePicturePromise.then((data) => {
        console.log("promise 获取 数据", data)
      })
    },
    openSound() {
      var openSoundPromise = playr.openSound();
      openSoundPromise.then((data) => {
        console.log("promise 获取 数据", data)
      })
    },
    closeSound() {
      var closeSoundPromise = playr.closeSound();
      closeSoundPromise.then((data) => {
        console.log("promise 获取 数据", data)
      })
    },
    startSave() {
      var startSavePromise = playr.startSave();
      startSavePromise.then((data) => {
        console.log("promise 获取 数据", data)
      })
    },
    stopSave() {
      var stopSavePromise = playr.stopSave();
      stopSavePromise.then((data) => {
        console.log("promise 获取 数据", data)
      })
    },
    ezopenStartTalk() {
      playr.startTalk();
    },
    ezopenStopTalk() {
      playr.stopTalk();
    }
  }

}
</script>

<style scoped>
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