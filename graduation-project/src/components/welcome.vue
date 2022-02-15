<template>
<div>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item>
      <img src="../assets/weclome/sixPic/1.jpg">
    </el-carousel-item>

    <el-carousel-item>
      <img src="../assets/weclome/sixPic/2.jpg">
    </el-carousel-item>

    <el-carousel-item>
      <img src="../assets/weclome/sixPic/3.jpg">
    </el-carousel-item>

    <el-carousel-item>
      <img src="../assets/weclome/sixPic/4.jpg">
    </el-carousel-item>

    <el-carousel-item>
      <img src="../assets/weclome/sixPic/5.jpg">
    </el-carousel-item>
  </el-carousel>

  <el-carousel :interval="5000" arrow="always" height="400px">
    <el-carousel-item >
      <img src="../assets/weclome/fourPic/1.jpg">
    </el-carousel-item>
    <el-carousel-item>
      <img src="../assets/weclome/fourPic/2.jpg">
    </el-carousel-item>
    <el-carousel-item>
      <img src="../assets/weclome/fourPic/5.jpg">
    </el-carousel-item>
    <el-carousel-item>
      <img src="../assets/weclome/fourPic/4.jpg">
    </el-carousel-item>
  </el-carousel>

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