import Vue from 'vue'
import App from './App.vue'
import router from './router'

window._ = require('lodash')
window.ASCIIFolder = require('fold-to-ascii')

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
