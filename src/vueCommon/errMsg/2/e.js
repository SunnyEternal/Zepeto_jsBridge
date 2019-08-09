import dom from './e.vue'
import Vue from 'vue'

const MyClass = Vue.extend(dom)
let instance = new MyClass({
  el: document.createElement('div')
})

const obj = {
  show(state, {el = document.querySelector('body'), text = '错误提示'} = {}) {
    instance.text = text
    if (state) {
      el.appendChild(instance.$el)
      instance.show = true
      setTimeout(() => { instance.$el.style.opacity = '1' }, 50)
    } else {
      instance.$el.style.opacity = '0'
      setTimeout(() => { instance.show = false }, 50)
    }
  }
}

export default {
  install() {
    if (!Vue.reminderMsg) {
      Vue.$reminder = obj
    }
    Vue.mixin({
      created() {
        this.$reminder = Vue.$reminder
      }
    })
  }
}
