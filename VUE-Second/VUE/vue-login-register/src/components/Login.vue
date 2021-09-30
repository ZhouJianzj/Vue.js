<template>

<div style="width:calc(30%); margin-top: 10%; margin-left: 30%;">
	<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	  <el-form-item label="用户名" prop="userName">
	    <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
	  </el-form-item>
	  
	  <el-form-item label="密码" prop="checkPass">
	    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
	  </el-form-item>
	  
	  <el-form-item>
		  
	    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
         
          }
          callback();
        
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          userName: '',
          checkPass: ''
        },
		
        rules: {
          userName	: [
            { validator: validateUserName, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
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