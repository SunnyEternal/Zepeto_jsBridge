import 'babel-polyfill'
import 'zepto/src/zepto' // me
import 'zepto/src/event' // me

import 'zepto/src/ajax'

import '@/static/css/reset.scss'

// import '@/bag/plugins/ext' // me

// import '@/bag/plugins/EZGesture'

// import '@/bag/plugins/canvas2image' // me
// import '@/bag/plugins/html2canvas/html2canvas.050beta4.min.js' // me

// import VueLazyload from 'vue-lazyload'

import Vue from 'vue'
import App from './App'
import router from './router/r'

import * as _ajax from '@/static/js/requestSupport'

import ut from '@/utils/index.js'

import loading from '@/vueCommon/loading/3/l.js'
import reminder from '@/vueCommon/errMsg/2/e'
import toast from '@/vueCommon/toast/1/t'

// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import '@/static/css/swiper.css'

// Vue.use(VueAwesomeSwiper)

let mixins = {
  install(vue, options) {
    vue.prototype.$ut = ut
    vue.prototype.$ajax = _ajax
    vue.prototype.$myState = {
      upload: false
    }
  }
}
Vue.use(mixins)
Vue.use(reminder)
Vue.use(loading)
Vue.use(toast)

/* eslint-disable no-new */
// Vue.use(VueLazyload, {
//     error:require('@/static/img/blank.jpg'),
//     loading:require('@/static/img/blank.jpg')
// })
let v1 = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
export default v1
