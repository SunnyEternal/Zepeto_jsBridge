<template>
  <div class="mask errMsg" style="display:none;z-index:601">
    <div class="errMsgWpr p-r">
      <em v-if="!!showMsgBg.src" class="showMsgBg bgImgSize" :style="{backgroundImage : 'url('+ showMsgBg.src + ')'}"></em>
      <div class="owpr p-r">
        <var :style="{color: msgColor}">错误提示</var>
        <img :src="doneBtn.src" class="sure close" alt="" />
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
        doneBtn: state => state.modA.page1.p1_doneBtn,
        msgColor: state => state.modA.page1.msgColor,
      }),
      // distImg:this.myApp.distImg
    }
  }
</script>
<style lang="scss">
.errMsg{
  .errMsgWpr{
   width:4.5rem;height:4.5rem;background-color: grey;color:#fff;border-radius:.3rem;box-sizing: border-box;overflow: hidden;
   .owpr{
     height:100%;
     display:flex;flex-direction: column;align-items: center;justify-content: center;z-index:2;padding-bottom: .16rem;
   }
 }
  button{
    width:2.82rem;font-size: .42rem;margin-top:.62rem;
  }
  var{
    font-size: .32rem;color:#fff
  }
  .sure{
    width:2.9rem;margin-top:.75rem;
  }
}
</style>
