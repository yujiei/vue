<template>
   <div class="edit">
    <hmheader title="编辑个人信息">
      <!-- <van-icon name="arrow-left" slot='left' @click="$router.back()"/> -->
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </hmheader>
    <div class="userimg">
      <img :src="currentUser.head_img" alt />
      <van-uploader :after-read="afterRead" />
    </div>
    <hmcell title="昵称" :desc="currentUser.nickname" @click="nickshow=!nickshow"></hmcell>
    <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm="updateNickname">
      <van-field ref="nick" :value="currentUser.nickname" placeholder="请输入昵称" required label="昵称" />
    </van-dialog>
    <hmcell title="密码" :desc="currentUser.password" type="password" @click="passshow=!passshow"></hmcell>
    <van-dialog
      v-model="passshow"
      title="修改密码"
      show-cancel-button
      @confirm="updatePassword"
      :before-close="beforeClose"
    >
      <van-field ref="originPass" placeholder="请输入原密码" required label="原密码" />
      <van-field ref="newPass" placeholder="请输入新密码" required label="新密码" />
    </van-dialog>
    <hmcell title="性别" :desc="currentUser.gender===0?'女':'男'" @click="gendershow=!gendershow"></hmcell>
      <van-dialog v-model="gendershow" title="修改性别" show-cancel-button @confirm="updateGender">
      <van-picker :columns="['女','男']" :default-index="currentUser.gender" @change="onChange" />
    </van-dialog>
  </div>
</template>

<script>
import hmheader from '@/components/hmheader.vue'
import hmcell from '@/components/hmcell.vue'
import {getUserById,updateUserById} from '@/apis/user.js'
import {uploadFile} from '@/apis/upload.js'
export default {
    components:{
        hmheader,hmcell
    },
    data(){
        return{
            currentUser :{},
            // 修改昵称对话框是否可见
            nickshow:false,
            passshow:false,
            gendershow:false,
            gender:''
        };
    },
     async mounted () {
         let res = await getUserById(this.$route.params.id);
         console.log(res);
         if(res.data.message === '获取成功') {
             this.currentUser = res.data.data;
            //  如果有图片，则拼接
            if(this.currentUser.head_img) {
                this.currentUser.head_img = 'http://127.0.0.1.3000'+ this.currentUser.head_img;
            } else {
            //  没u图片，则设置默认图片
            this.currentUser.head_img = 'http://127.0.0.1:3000/uploads/images/default.png';
            }
         }
     },
     methods :{
         async afterRead(file) {
            //  file.file 当前的文件对象
            let formdata = new FormData();
            formdata.append('file',file.file);   //转化为二进制
            let res =await uploadFile(formdata);
            if(res.data.message === '文件上传成功'){
                // 实现预览
                this.currentUser.head_img = 'http://127.0.0.1:3000'+res.data.data.url;
                // 再次发起请求 ，实现用户头像的更新
                
            }


         }
     }
}
</script>

<style>

</style>