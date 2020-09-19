import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/font/iconfont.css'
import './assets/css/common.css'

Vue.use(MintUI);
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
