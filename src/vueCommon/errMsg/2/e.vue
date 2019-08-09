<template>
  <div class="reminder mask" v-if="show" style="opacity:0;">
    <div class="wpr">
      <!-- <em class="showMsgBg" :style="{backgroundImage : 'url('+ bgImg + ')'}"></em> -->
      <div class="inWpr">
        <p v-html="text"></p>
        <!-- <button type="button" name="button" @click="hide">确定</button> -->
        <img :src="require('@/static/img/done.png')" class="button" @click="hide" alt="">
        <!-- <var>客服微信：binbin888whb</var> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    },
    show: {
      type: Boolean,
      default: false
    },
    showCancel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // bgImg: require('@/static/img/bg.jpg')
    }
  },
  methods: {
    hide(e, msg = '') {
      this.show = false
      this.text = ''
      if (e) {
        setTimeout(() => {
          $('.reminder').css({'opacity': 0})
        }, 80)
      }
    }
  }
}
</script>

<style lang="scss">
.reminder{
  .inWpr{
    padding-top:.3rem;background-color:#f8e8ca;
  }
  p{
    text-align: center;box-sizing: border-box;
  }
  button, .button{
    border:none;width:2.6rem;line-height: .9rem;color:#171717;font-size: .34rem;font-weight: bold;
    background-color: #ffd753;border-radius: .1rem;display: block;margin:.55rem auto .46rem;
  }
  // var{
  //   text-align: center;display: block;color:#978b79;
  // }
}
</style>
