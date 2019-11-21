import Vue from 'vue'
import App from './App.vue'
import '@/styles/resets.css';
import '@/styles/global.css';
Vue.config.productionTip = false
import axios from 'axios';
Vue.prototype.$http = axios;
const EventBus = new Vue();
// // 本地用户信息
// Vue.prototype.userInfo = {
//   id: 'adfasf'
// };
import router from './router';
new Vue({
  render: h => h(App),
  router,
  data:{
    EventBus
  }
}).$mount('#app')
