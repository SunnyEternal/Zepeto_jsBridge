import dom from './t.vue'
import Vue from 'vue'

const MyClass = Vue.extend(dom)
let instance = new MyClass({
  el: document.createElement('div')
})

const obj = {
  show(state, {el = document.querySelector('body'), text = 'toast...'} = {}) {
    if (state) {
      el.appendChild(instance.$el)
      instance.text = text
      instance.state = true
      setTimeout(() => {
        instance.state = false
      }, 1200)
      // setTimeout(() => { instance.$el.style.opacity = '1' }, 30)
    } else {
      instance.state = false
    }
  }
}

export default {
  install() {
    if (!Vue.toast) {
      Vue.$toast = obj
    }
    Vue.mixin({
      created() {
        this.$toast = Vue.$toast
      }
    })
  }
}
