<template>
  <div class="selectBox mask" style="display:none;z-index:590">
    <div class="owpr p-r">
      <em class="showMsgBg" :style="{'backgroundImage' : 'url('+ showMsgBg + ')'}"></em>
      <div class="txt p-r">
        请使用正脸拍摄
      </div>
      <div class="wpr p-r">
        <!-- <span :style="{color:msgColor}">请使用正脸拍摄</span> -->
        <a href="javascript:void(0)" class="normalBtn cameraMenuBtn" id="cameraBtn">
          <img :src="require('@/static/img/cameraBtn.png')" style="width:2.87rem" alt="">
        </a>
        <a href="javascript:void(0)" class="normalBtn cameraMenuBtn" id="galleryBtn">
          <img :src="require('@/static/img/galleryBtn.png')" style="width:2.87rem" alt="">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showMsgBg: require('@/static/img/bg.jpg')
      }
    }
  }
</script>

<style lang="scss">
.selectBox .wpr{
 width:4.5rem;height:4.5rem;z-index:2;box-sizing: border-box;padding-bottom: .16rem;overflow: hidden;
 display:flex;flex-direction: column;align-items:center;justify-content:center;
 span{
   color: #fff;font-size: .32rem;margin-bottom: .36rem;
 }
}
.selectBox .wpr{
  box-sizing: border-box;padding-top:.4rem;
}
.selectBox .wpr a{
  width:2.82rem;margin:.2rem 0;
}
.selectBox .owpr{
  overflow: hidden;border-radius:.2rem;
}
.selectBox .txt{
  letter-spacing: .03rem;font-size: .3rem;z-index:2;
  text-align: center;position: absolute;top:.0;left:0;width:100%;background-color: #a9967d;color:#fff;line-height: .66rem;
}
.selectBox .flow1{
  left:.65rem;top:.34rem;width:.16rem;z-index:6;transform: rotateZ(45deg);
}
.selectBox .flow2{
  right:.65rem;top:.1rem;width:.21rem;z-index:6;
}
</style>
