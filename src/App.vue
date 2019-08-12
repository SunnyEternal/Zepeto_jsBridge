<template>
  <div id="app">
    <!-- <h3>站位置：{{whereIs}}</h3>

    <h3>Base State</h3>
    <p>{"isAnd":false,"isIos":false,"isInApp":false}</p>
    <br>

    <h3>AppInfo</h3>
    <p>...</p>
    <br>

    <h3>用户ID/ZepetoId：</h3>
    <p>...</p>
    <br>

    <h3>在App内：{{isInApp}}</h3>
    <img style="display: block;" :src="myImgURL" />

    <button type="button" class="common combine" @click="twoCombine">两个人物形象合成一个</button><br><br><br>
    <button type="button" class="common single" >生成单个人物形象</button> -->

  </div>
</template>

<script>
import Handlers from '@/static/js/handlers'

import renderOption from '@/bridge/params/renderOption'
import renderClass from '@/bridge/renderClass'

export default {
  name: 'App',
  data() {
    return {
      whereIs: 'web', // 站位置
      userId: '', // 用户Id
      isInApp: null,
      myImgURL: '', // 生成的我的形象
    }
  },
  mounted() {
    window.addEventListener('offline', () => {
      alert('请检查网络链接')
    })
    this.init()
  },
  methods: {
    // close() {
    //   window.location.href="ZEPETO://WEBVIEW/CLOSE"
    // }
    // 检测是否在app内
    init() {
      let timer = setInterval(() => {
        Handlers.checkAppInfo()
        if (window.ZEPETO) {
          this.whereIs = 'app'
          this.userId = window.ZEPETO.userInfo.hashCode || ''
          this.$myState.zepetoId = this.userId
          clearInterval(timer) 
        }
        // console.log(`userId:${this.userId}`)
        // console.log(`whereIs:${this.whereIs}`)
      }, 20)

      setTimeout(() => {
        this.isInApp = Handlers.myApp.isInApp
        // console.log(`isInApp:${Handlers.myApp.isInApp}`)
        if(Handlers.myApp.isInApp){
          // console.log('在 App 里')
        }
        clearInterval(timer)
      }, 1500)
    },
    // 两个人物形象合成一个
    twoCombine() {
      let params = new renderOption({width: 400, height: 400})
      renderClass.render(params).then(url => {
        let img = new Image();
        img.src = url;
        document.body.append(img);
      }).catch(err => {
        console.log(err)
      });
      
    },
  },
  watch: {
    // '$route' (to, from) {
    //   console.log('>>> AppVue $route', to, from)
    //   if (to.path == '/') {
    //     this.transitionName = 'slide-right'
    //   } else {
    //     this.transitionName = 'slide-left'
    //   }
    //   window.scrollTo(0, 0)
    // }
  }
}
</script>

<style lang="scss">
body,html {
  height:100%;
}
// min-height:12.26rem;
#app{
  width:100%;max-width:750px;height:100%;background-size:100% auto;padding:.8rem .2rem;box-sizing:border-box;color: #333;font-size:.32rem;
  p{
    line-height: .56rem;
  }
  .common{
    border: none;
    width: 3.6rem;
    height: .6rem;
    background-color: orange;
    color: #fff;
    line-height: .6rem;
    text-align: center;
    font-size: .32rem;
    z-index:6667;
  }
  .combine{

  }
  .single{

  }
}

</style>
