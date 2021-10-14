<template>
	
	<!-- 核心就是使用  	  :default-active="this.$route.path" 获取当前的路由地址 -->
	<el-menu
	  :default-active="this.$route.path"
	  class="el-menu-demo"
	  mode="horizontal"
	  background-color="#545c64"
	  text-color="#fff"
	  active-text-color="#ffd04b"
	  router>
	  <!-- 这里的index，在使用router之后就代表的是路由地址 -->
	  <el-menu-item index="/one" >待付款</el-menu-item>
	  <el-menu-item index="/two" route="">代发货</el-menu-item>
	  <el-menu-item index="/three" >待收货</el-menu-item>
	  
	</el-menu>
	
	
</template>
<script>
	  export default {
	    data() {
	      return {
	        
	      };
	    },
	    methods: {
	     
	    }
	  }
</script>