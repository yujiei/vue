<template>
  <div class="login">
       <div class="container">
           <div class="close">
               <span class="iconfont iconicon-test"></span>
           </div>
           <div class="logo">
               <div class="iconfont iconnew"></div>
           </div>
           <div class="inputs">
<!-- 使用封装组件时的属性设置默认会设置给封装组件的根元素 -->
          <!-- 如果封装组件设置了props,那么优先为props中的成员赋值 -->
          <hminput placeholder="请输入用户名/手机号"
          :rules= '/^(\d{5,6})$ | ^(1\d{10})$/'
          msg="用户名或手机号输入错误"
          v-model="users.username"
          ></hminput>
          <hminput placeholder="请输入密码"
          :rules= '/^\S{3,16}$/'
          msg="请输入3-16位密码"
          v-model="users.password"
          ></hminput>
          <hminput placeholder="请输入昵称"
           :rules='/^\w+$/'
           msg="请输入昵称"
           v-model="users.nickname"
          > </hminput>
           </div>    
           <p class="tips">已有账号？
               <a href="#/login" class> 去登陆</a>
               </p>  
                <hmbutton @click="register">注册</hmbutton>     
       </div>
  </div>
</template>

<script>
import hmbutton from '@/components/hmbutton.vue'
import hminput from '@/components/hminput.vue'
import {register} from '@/apis/user.js'
export default {
        components :{
            hmbutton,hminput
        },
        data() {
            return{
                users:{
                    username : '',
                    password :'',
                    nickname : ''
                }
            }
        },
        methods : {
             async register (){
                 let res =await register(this.users)
                 console.log(res);
                 if(res.data.message === '注册成功'){
                     this.$toast.success('注册成功')
                     console.log(this)
                     //轻提示的用法 this.$toast
                     this.$router.push({name:'Login'})
                     //路由跳转
                 }else{
                     this.$toast.fail('注册失败')
                 }
             }
        }

};
</script>

<style lang="less" scoped>
  .container {
       padding: 20px;
  }
.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>