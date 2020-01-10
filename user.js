// 引入的axios已经配置好基准路径
import axios from '@/utils/myaxios.js'

// 1.登陆
// 暴露  定义  login= 箭头函数
export const login = (data) => {
    return axios({
        method:'post',
        url:'/login',
        data
    })
}
// 根据id获取用户详情
 export const getUserById = (id) =>{
     return axios({
         url:`/user/${id}`,
         headers:{'Authorization':localStorage.getItem('toutiao_41_token')}
        //  语法：   headers:{后台规定的key：token}
        // 自定义的请求头，用来提供授权谁
     })
 }

//  3.更新个人信息
export const updataUserById = (id,data) =>{
    return axios ({
        method : 'post',
        url : `/user_update/${id}`,
        data
    })
}

// 4.实现用户注册
export const register = (data) =>{
    return axios ({
        method : 'post',
        url : '/register',
        data
    })
}

// 5.关注用户
export const followUser = (id) =>{
   return axios ({
       url : `/user_follows/${id}`
   })
}

// 6.取消关注用户
export const unfollowUser = (id) =>{
    return axios ({
        url : `/user_unfollow/${id}`
    })
}