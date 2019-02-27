// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {Button} from "mint-ui"
import router from './router'
import store from "./store"

import "./mock/mockServer"
Vue.config.productionTip = false
Vue.component(Button.name,Button)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
