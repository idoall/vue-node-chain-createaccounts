// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueClipboard from 'vue-clipboard2'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

// 使 BootstrapVue 在整个项目中可用
Vue.use(BootstrapVue)
// 可选安装 BootstrapVue 图标组件插件
Vue.use(IconsPlugin)
Vue.use(VueClipboard)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
