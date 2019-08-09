<template>
  <div class="selectBox mask" style="display:-none;z-index:590">
    <div class="owpr p-r">
      <em v-if="!!showMsgBg.src" class="showMsgBg bgImgSize" :style="{backgroundImage : 'url('+ showMsgBg.src + ')'}"></em>
      <!-- <div class="txt">
        <img :src="require('./img/cameraMenu_tit.jpg')" width="100%" alt="">
      </div> -->
      <div class="wpr p-r">
        <!-- <span :style="{color:msgColor}">请使用正脸拍摄</span> -->
        <!-- <img :src="cameraBtn.src" id="cameraBtn" class="cameraMenuBtn" alt=""> -->
        <a href="javascript:void(0)" class="normalBtn cameraMenuBtn" id="cameraBtn" :style="{backgroundImage:'url(' + require('@/static/img/btn-normal.png') + ')'}">
          拍照
        </a>
        <!-- <img :src="albumBtn.src" id="galleryBtn" class="cameraMenuBtn" alt=""> -->
        <a href="javascript:void(0)" class="normalBtn cameraMenuBtn" :style="{backgroundImage:'url(' + require('@/static/img/btn-gre.png') + ')'}">
          相册
        </a>
        <!-- <button type="button" class="dangerBtn" id="galleryBtn">相册</button> -->
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState({
        showMsgBg: state => state.modA.page1.p1_showMsgBg,
        cameraBtn: state => state.modA.page1.p1_cameraBtn,
        albumBtn: state => state.modA.page1.p1_albumBtn,
        msgColor: state => state.modA.page1.msgColor,
      }),
      // distImg:this.myApp.distImg
    }
  }
</script>

<style lang="scss">
.selectBox .wpr{
 width:4.5rem;height:4.5rem;border-radius:.3rem;z-index:2;box-sizing: border-box;padding-bottom: .16rem;overflow: hidden;
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
  overflow: hidden;border-radius:.3rem;background-color: grey;
}
.selectBox .txt{
  letter-spacing: .03rem;font-size: .26rem;
  text-align: center;position: absolute;top:.0;left:0;width:100%;background-color: #3d4b92;color:#fff;line-height: .62rem;
}
.selectBox .flow1{
  left:.65rem;top:.34rem;width:.16rem;z-index:6;transform: rotateZ(45deg);
}
.selectBox .flow2{
  right:.65rem;top:.1rem;width:.21rem;z-index:6;
}
</style>
