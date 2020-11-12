import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'
import axios from 'axios'
import vantConfig from './vant.config'
import VueTouch from 'vue-touch'
import { Lazyload } from 'vant';
import 'lib-flexible/flexible'
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueAxios, axios)
Vue.use(vantConfig)
Vue.use(Lazyload, {
  lazyComponent: true,
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
