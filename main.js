import Vue from 'vue'
import App from './App.vue'


import router from '@/router/index.js'

import { Button,Toast,Uploader,Icon,Dialog,Field,Picker,Tab,Tabs,List,PullRefresh } from 'vant'
Vue.use(Button)
   .use(Toast)  //弹对话框
  .use(Uploader)
   .use(Icon)
   .use(Dialog)
   .use(Field)
   .use(Picker)
   .use(Tab)
   .use(Tabs)
   .use(List)
   .use(PullRefresh)
// 引入全局样式
import '@/styles/reset.css'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
