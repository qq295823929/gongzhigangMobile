// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js';
import vant from 'vant'
import 'vant/lib/index.css'
// import 'lib-flexible/flexible.js'
import './assets/Iconfont/iconfont.css'
import './assets/Iconfont/iconfont.js'
import './assets/common.scss'
import './styles/index.scss'
import './permission'
Vue.use(vant);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app');





