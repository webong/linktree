import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


console.log("hello world")

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
