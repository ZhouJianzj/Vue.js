<template>
  <div id="app">  
	<div class="web">
		<daohang></daohang>
		<div class="content">	
			<router-view></router-view>
		</div>
	</div>
  </div>
</template>

<script>

import daohang from '../src/components/daohang.vue'
export default {
  name: 'app',
  components: {
    daohang
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.web{
	width: 400px;
	height: 400px;
	border:3px solid black;
}
.content{
		height:338px;
		background-color: cadetblue;
	}
</style>
