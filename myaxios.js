import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:3000'

// ......还有一大坨代码

// 请求拦截器
axios.interceptors.request.use(function(config){
    // 在发送请求之前做些什么
    // 获取token
    let token = localStorage.getItem('toutiao_41_token')
    if(token){
        config.headers.Authorization =token
    }
      return config;
},function (error) {
    return Promise.reject(error);
}
);

// 响应拦截器
axios.interceptors.response.use(function(response) {
    console.log(response)
    if(response.data.message === '用户信息验证失败' || response.data.message === '用户信息验证失败！'){
        window.location.href= '#/login'
    }
    return response;
},function(error){
    return Promise.reject(error);
});
export default axios