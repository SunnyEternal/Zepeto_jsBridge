<template>
  <div id="p1">
    <div class="wpr">
      <p>站位置：{{whereIs}}</p>
      <p>用户ID：<input type="text" v-model="userId"></p>
      <p>在App内：{{isInApp}}</p>
      <img :src="myImgURL" />
      <button type="button" name="button" class="startBtn" @click="startBtn">生成单个人物形象</button>
      <button type="button" name="button" class="startBtn" @click="twoCombine">两个人物形象合成一个</button>
    </div>
  </div>
</template>

<script>
import Handlers from '@/static/js/handlers'
import BrowserChecker from '@/utils/BrowserChecker'

import renderOption from '@/bridge/params/renderOption'
import renderClass from '@/bridge/renderClass'

export default {
  data(){
    return {
      whereIs: 'web', // 站位置
      userId: '', // 用户Id
      isInApp: null,
      myImgURL: '', // 生成的我的形象
    }
  },
  mounted() {

    this.init()
    
  },
  methods: {
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
    startBtn() {
      try {
        let zepetoId = this.userId.trim()
        this.$ut.checkUserName(zepetoId, 10)
        // console.log(zepetoId + ''.includes(' ') == true)
        // console.log(`myState:${this.$myState}`)
        // 判断中间是否包含空格和特殊字符（都能通过接口）
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
        if (zepetoId.includes(' ') || pattern.test(zepetoId)){
          setTimeout(() => { this.$loading.show(0) }, 100)
          // return this.$reminder.show(1, {text: '崽崽id格式不支持'})
          alert('崽崽id格式不支持')
        }
        this.$ajax.correct(zepetoId).then(res => {
          if (res.code == 200) {
            this.$ajax.getUserActions({characterHashCodes: [zepetoId]}).then(res => {
              this.myImgURL = res[0]
            })
          } else {
            this.$reminder.show(1, {text: res.msg})
          }
        })
      } catch (e) {
        if ((e + '').toLowerCase().includes('urierror')) {
          return this.$reminder.show(1, {text: '崽崽id格式不支持'})
        }
        // console.log((e + '').substr(6));
        this.$reminder.show(1, {text: (e + '').substr(6)})
      }
    },
  }
}
</script>

<style lang='scss'>
#p1{
  padding-top: 60px;
  font-size: 20px;
  color: #333;
}
</style>
