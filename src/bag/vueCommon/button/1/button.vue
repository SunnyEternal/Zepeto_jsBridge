<template>
  <div class="btn">
    <em @touchstart="handTouchstart" @touchend="handTouchend" @click="emitFn" :class="{tap: tapState}" :style="{color: sty.color,width:sty.width, backgroundImage:'radial-gradient(' + sty.sColor + ' 0%,' + sty.eColor + ' 85%,'+ sty.eColor + ')'}">{{sty.value}}</em>
  </div>
</template>

<script>
export default {
  props:{
    sty:Object,
    eventName: String
  },
  data() {
    return {
      tapState:false
    }
  },
  methods: {
    handTouchstart(e) {
      this.tapState = true
    },
    handTouchend() {
      this.tapState = false
    },
    emitFn() {
      this.$emit(this.eventName)
    }
  },
  computed:{
    backgroundImg:function() {
      // console.log(`======> radial-gradient(${this.sty.sColor} 0%,${this.eColor} 85%, ${this.sty.eColor});}`)
      return `radial-gradient(${this.sty.sColor} 0%,${this.eColor} 85%, ${this.sty.eColor});}`
    }
  }
}
</script>

<style lang="scss">
.btn{
  position: relative;display:inline-block;
  em{
    display:block;transition: all 1.4s;
    font-size: .36rem;width:3.48rem;line-height:.8rem;
    position: relative;z-index: 2;text-align: center;
    background-image:radial-gradient(#ffea00 0%,#ffea05 65%, #fff373);
    color:#60594e;
  }
  em.tap{
    top:.03rem;left:.03rem;
  }
  &:before{
    content:"";display: block;position: absolute;z-index: 1;background-color: rgba(100, 100, 100, .5);
    width:100%;height:100%;top:.1rem;left:.1rem;
  }
}
</style>
