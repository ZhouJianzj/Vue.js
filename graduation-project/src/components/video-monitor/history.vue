<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>远程控制</el-breadcrumb-item>
      <el-breadcrumb-item>监控画面</el-breadcrumb-item>
    </el-breadcrumb>


    <el-row>
      <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }" style="width: 500px">
          <div class="image" id="video-container" v-show="show"></div>
          <div align="left" id="ysopen" v-show="showRec"></div>

          <div style="padding: 2px;">
            <span>监控设备</span>
            <div class="bottom clearfix">
              <time class="time">{{ Date.now() }}</time>
              <el-button id="buttonCheck" type="text" class="button" @click="videoRec">查看回放</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import EZUIKit from 'ezuikit-js';

var player = null;
var playr = null;

export default {
  name: "history",

  mounted: () => {
    // console.group("mounted 组件挂载完毕状态===============》");
    // const res = this.$http.post("/vm/getAccessToken");
    // console.log(res);

    fetch('http://localhost/vm/getAccessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "token": window.sessionStorage.getItem("token")
      }
    })
        .then(response => response.json())
        .then(res => {
          console.log(res);
          var accessToken = res.data.accessToken;

          player = new EZUIKit.EZUIKitPlayer({
            id: "video-container", // 视频容器ID
            accessToken: accessToken,
            url: "ezopen://open.ys7.com/G82446190/1.hd.live",
            template: 'theme',//
            autoplay: true,
            plugin: ['talk'],// 加载插件，talk-对讲
            startTalk: () => this.playr.startTalk(),
            stopTalk: () => this.playr.stopTalk(),
            width: 499,
            height: 320,
          });


        });


  },

  data() {
    return {
      show:true,
      showRec:false
    }
  },

  methods: {
    //查看回放按钮事件
    videoRec() {
      if (document.getElementById("buttonCheck").innerText == "查看回放"){
        this.show = false
        this.showRec = true
        document.getElementById("buttonCheck").innerText = "直播视频"
        fetch('http://localhost/vm/getAccessToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "token": window.sessionStorage.getItem("token")
          }
        })
            .then(response => response.json())
            .then(res => {
              var accessToken = res.data.accessToken;
              // 回放播放器初始化
              playr = new EZUIKit.EZUIKitPlayer({
                id: "ysopen", // 视频容器ID
                accessToken: accessToken,
                url: "ezopen://open.ys7.com/G82446190/1.cloud.rec",
                template: 'theme',//
                autoplay: true,
                plugin: ['talk'],// 加载插件，talk-对讲
                startTalk: () => this.playr.startTalk(),
                stopTalk: () => this.playr.stopTalk(),
                width: 500,
                height: 320,
              });
            });
      }else {
        this.show = true
        this.showRec = false
        document.getElementById("buttonCheck").innerText = "直播视频"
      }

    }
  }

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

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>