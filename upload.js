// 引入的axios已经配置好基准路径
   import axios from '@/utils/myaxios.js'


//    实现文件上传 
    export const uploadFile = (data)=>{
        return axios ({
            method : 'post',
            url : '/upload',
            data
        })
    }