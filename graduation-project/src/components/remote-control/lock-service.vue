<template>
  <div >
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>远程控制</el-breadcrumb-item>
      <el-breadcrumb-item>锁机功能</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="height: 600px">

<!--      <el-row >-->
<!--        <el-col>-->
          <div >
            <el-transfer
                v-model="value"
                :data="data"
                align="center"
                filterable
                :titles="['资源', '摄像头、设备、客户']"
            >
            </el-transfer>
          </div>
<!--        </el-col>-->
<!--      </el-row>-->

<!--      <el-row>-->
<!--        <el-col>-->
      <br>  <br>
          <div>
            <el-button
                type="primary"
                @click="openFullScreen2">
              绑定
            </el-button>
          </div>
<!--        </el-col>-->
<!--      </el-row>-->

<!--      <el-row>-->
<!--        <el-col>-->
      <br>  <br>
      <br>  <br>
          <div>
            <el-steps :active="active" align-center finish-status="success">
              <el-step title="步骤1"  description="设备绑定摄像头成功！"></el-step>
              <el-step title="步骤2"  description="客户绑定设备成功！"></el-step>
              <el-step title="步骤3"  description="开锁密码设备之成功！"></el-step>
              <el-step title="步骤4"  description="设备锁服务开通成功！"></el-step>
            </el-steps>
          </div>
<!--        </el-col>-->
<!--      </el-row>-->
    </el-card>

  </div>
</template>

<script>


export default {
  name: "lock-service",
  data() {
    const generateData = _ => {
      const data = []
      this.getAll().then(function (getAll) {
        getAll.result.forEach(all => {
          data.push({
            key: all.key,
            label: all.label,
            disabled: all.key === 111111 || all.key === 222222 || all.key === 333333
          });
        })
      })
      return data;
    };
    return {
      fullscreenLoading: false,
      value: [],
      data: generateData(),
      active:null
    }
  },
  methods: {
    async openFullScreen2() {
      const loading = this.$loading({
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(async () => {
        const {data: res} = await this.$http.post("/rc/device/allBind", this.value);
        if (res.code === 200) {
          while (this.active <= 3) {
             this.active++
          }
          this.$message.success(res.message)
          loading.close();
        } else {
          this.$message.error(res.message)
          loading.close();
        }
      }, 2000);

    },

    async getAll() {
      const {data: res} = await this.$http.get("/rc/device/getAll");
      // console.log(res.result);
      return res
    },

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