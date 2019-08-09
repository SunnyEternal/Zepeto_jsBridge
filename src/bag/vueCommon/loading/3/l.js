import dom from './l.vue'
import Vue from 'vue'

const MyClass = Vue.extend(dom)
let instance = new MyClass({
  el: document.createElement('div')
})

const obj = {
  show(state, {el = document.querySelector('body'), text = 'loading...'} = {}) {
    instance.text = text
    if (state) {
      el.appendChild(instance.$el)
      instance.show = true
      setTimeout(() => { instance.$el.style.opacity = 1 }, 50)
    } else {
      if (!instance.$el.style) return
      instance.$el.style.opacity = '0'
      setTimeout(() => { instance.show = false }, 50)
    }
  }
}

export default {
  install() {
    if (!Vue.loading) {
      Vue.$loading = obj
    }
    Vue.mixin({
      created() {
        this.$loading = Vue.$loading
      }
    })
  }
}
