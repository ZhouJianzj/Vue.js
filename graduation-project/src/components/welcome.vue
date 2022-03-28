<template>
<div>

  <iframe src="http://10.90.15.202/vision/cloudconfig/custom/previews/display.html?tag=displays/%E6%9D%A5%E8%87%AA%E5%B8%82%E5%9C%BA/%E6%B1%BD%E8%BD%A6%E7%9B%91%E6%B5%8B%E6%95%B0%E6%8D%AE%E4%B8%AD%E5%BF%83%E5%A4%A7%E5%B1%8F.json&visionId=686506951625932800"
          style="height: 100vh;width: 100%"></iframe>
<!--  <el-carousel :interval="4000" type="card" height="200px">-->
<!--    <el-carousel-item>-->
<!--      <img src="../assets/weclome/sixPic/1.jpg">-->
<!--    </el-carousel-item>-->

<!--    <el-carousel-item>-->
<!--      <img src="../assets/weclome/sixPic/2.jpg">-->
<!--    </el-carousel-item>-->

<!--    <el-carousel-item>-->
<!--      <img src="../assets/weclome/sixPic/3.jpg">-->
<!--    </el-carousel-item>-->

<!--    <el-carousel-item>-->
<!--      <img src="../assets/weclome/sixPic/4.jpg">-->
<!--    </el-carousel-item>-->

<!--    <el-carousel-item>-->
<!--      <img src="../assets/weclome/sixPic/5.jpg">-->
<!--    </el-carousel-item>-->
<!--  </el-carousel>-->

<!--  <el-carousel :interval="5000" arrow="always" height="400px">-->
<!--    <el-carousel-item >-->
<!--      <img src="../assets/weclome/fourPic/1.jpg">-->
<!--    </el-carousel-item>-->
<!--    <el-carousel-item>-->
<!--      <img src="../assets/weclome/fourPic/2.jpg">-->
<!--    </el-carousel-item>-->
<!--    <el-carousel-item>-->
<!--      <img src="../assets/weclome/fourPic/5.jpg">-->
<!--    </el-carousel-item>-->
<!--    <el-carousel-item>-->
<!--      <img src="../assets/weclome/fourPic/4.jpg">-->
<!--    </el-carousel-item>-->
<!--  </el-carousel>-->

</div>
</template>

<script>
export default {
  name: "welcome",
  data(){
    return{

    }
  },
  methods:{

  }
}
</script>

<style scoped>
.el-carousel__item{
  color: #991167;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>