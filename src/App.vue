<template>
  <div id="app">
    <!-- <img src="@/static/img/close.png" class="close" ref="close" @click="close"> -->
    <router-view class="child-view" />
    <!-- <cameraMenu /> -->
  </div>
</template>

<script>
import Handlers from '@/static/js/handlers'

export default {
  name: 'App',
  components: {
    // cameraMenu
  },
  beforeMount() {
    // Handlers.checkAppInfo()
  },
  mounted() {
    window.addEventListener('offline', () => {
      alert('请检查网络链接')
    })

    setTimeout(() => {
      // var vConsole = new VConsole();
      // $('.log').show().text('4-1521')
    }, 500)
    // console.log('app this', this);
  },
  methods: {
    close() {
      window.location.href="ZEPETO://WEBVIEW/CLOSE"
    }
  },
  watch: {
    '$route' (to, from) {
      console.log('>>> AppVue $route', to, from)
      if (to.path == '/') {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss">
body,html {
  height:100%;
}
#app{
    width:100%;max-width: 750px;height:100%;min-height:12.26rem;
    // left:0;top:0;bottom:0;right:0;position: fixed;overflow: scroll;
    // background:url('./static/img/bg.jpg') center top no-repeat;
    background-size: 100% auto;
    // .close{
    //   position: absolute;right:.2rem;top:.2rem;color:#fff;opacity: 0;z-index:999;width:.36rem;height:.36rem;
    // }
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
}
.slide-left-leave-active, .slide-right-enter{
  opacity: 0;
}

</style>
