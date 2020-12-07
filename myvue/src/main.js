import Vue from 'vue'
import App from './App.vue'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
import axios from 'axios'

Vue.prototype.axios=axios
axios.defaults.baseURL='http://127.0.0.1:3000'

Vue.config.productionTip = false
Vue.use(MintUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
