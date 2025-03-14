import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './config/rem'
import './style/common.less'


Vue.config.productionTip = false

import http from './config/http'
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
