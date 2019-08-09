<template>
  <div class="loading mask"  style="display:none;z-index:999;">
    <div class="cricle">
      <div class="cricleWpr">
        <img :src="require('@/static/img/loading-icon.png')" class="loadingIcon" style="width:.88rem" alt="" />
        <var>加载中...</var>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.mask{
  .showMsgBg{
      position: absolute;left:0;top:0;right:0;bottom:0;z-index:1;
      background-size: 100%;
  }
}
.loading{
  flex-direction: column;
  .cricle{
    width:4.5rem;height:4.5rem;text-align: center;border-radius: .3rem;position: relative;overflow: hidden;
    // box-shadow: 0 0 .4rem rgba(0, 0,0,.3);
    var{
     display: block;font-size: .26rem;margin-top:.26rem;color:#fff;font-weight: normal;letter-spacing: .02rem;
    }
  }
  .cricleWpr{
    height: 100%;position: relative;z-index:2;background-color:none;
    // box-shadow: 0 0 .4rem rgba(141,203,255, .6) inset;
    display: flex;flex-direction: column;align-items: center;justify-content:center;
  }
}
.loading.run .loadingIcon{
  will-change: transform;
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
