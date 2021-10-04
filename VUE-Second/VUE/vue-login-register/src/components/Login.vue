<template>

<div style="width:calc(30%); margin-top: 10%; margin-left: 30%;">
	<el-form :model="formData" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		
	  <el-form-item label="用户名" prop="userName">
	    <el-input type="text" v-model="formData.userName" autocomplete="off"></el-input>
	  </el-form-item>
	  
	  <el-form-item label="密码" prop="checkPass">
	    <el-input type="password" v-model="formData.checkPass" autocomplete="off"></el-input>
	  </el-form-item>
	  
	  <el-form-item>
		  
	    <el-button type="primary" @click="submitForm('ruleForm',formData)">提交</el-button>
	    <el-button @click="resetForm('ruleForm')">重置</el-button>
		<el-button @click="push()">注册</el-button>
		
	  </el-form-item>
	</el-form>
	
</div>
</template>

<script>
  export default {
    data() {
     	  
      var validateUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输用户名'));
        } else {
			callback();
        }
          
        
      };
	  // 自定义的验证器，指定的参数 
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        formData: {
          userName: '',
          checkPass: ''
        },
		
        rules: {
          userName	: [
			  //validator： 验证器，validateUserName：自定义的验证器，trigger: 'blur'：表示的是鼠标失去焦点
            { validator: validateUserName, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName,formData) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
			console.log(formData.userName)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
	  
	  push:function(){
		  this.$router.push('/register')
	  }
	  
    }
  }
</script>