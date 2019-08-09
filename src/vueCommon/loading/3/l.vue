<template>
  <div class="loading mask" style="z-index:600;opacity:0;" v-if="show">
    <div class="wpr">
      <!-- <em class="showMsgBg" :style="{backgroundImage : 'url('+ bgImg + ')'}"></em> -->
      <div class="inWpr">
        <img :src="require('@/static/img/loading-icon.png')" :class="{'loadingIcon':true, 'run': show}" style="width:1.08rem" alt="" />
        <var>{{text}}</var>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'loading...'
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // bgImg: require('@/static/img/bg.jpg')
    }
  }
}
</script>
<style lang="scss">
.mask{
  position: fixed;left:0;top:0;width:100%;bottom:0;background-color: rgba(0, 0, 0, .4);
  display: flex;justify-content: center;z-index:666;align-items: center;flex-direction: column;
  transition: all .4s;
  .wpr{
    width:4.5rem;height:4.5rem;text-align: center;border-radius: .3rem;position: relative;overflow: hidden;
    z-index:1;
  }
  .showMsgBg{
      position: absolute;left:0;top:0;right:0;bottom:0;z-index:1;
      background-size: 100%;
  }
  .inWpr{
    height: 100%;position: relative;z-index:2;background-color: #f8e8ca;
    display: flex;flex-direction: column;align-items: center;justify-content:center;
    color:#a9967d;font-size: .32rem;
  }
}
.loading{
    var{
     display: block;font-size: .28rem;margin-top:.66rem;font-weight: normal;letter-spacing: .02rem;
    }
}
 .loadingIcon.run{
  animation: loadRun 1.8s linear infinite;
}

@keyframes loadRun{
  0%{
    transform:rotateZ(0deg);
  }
  100%{
    transform:rotateZ(360deg);
  }
}
</style>
