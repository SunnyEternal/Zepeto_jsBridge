<template>
    <div class="rotCont">
      <div id="lottery" class="blink">
          <div class="group-wrap">
              <ul class="group">
                  <li class="unit" data-index="0"><img :src="require('@/static/img/gift1.jpg')" alt=""></li>
                  <li class="unit" data-index="9"><img :src="require('@/static/img/gift2.jpg')" alt=""></li>
                  <li class="unit" data-index="8"><img :src="require('@/static/img/gift3.jpg')" alt=""></li>
                  <li class="unit" data-index="7"><img :src="require('@/static/img/gift11.jpg')" alt=""></li>
              </ul>
              <ul class="group">
                  <li class="unit" data-index="1"><img :src="require('@/static/img/gift11.jpg')" alt=""></li>
                  <li class="start js-start" style="flex:2"></li>
                  <li class="unit" data-index="6"><img :src="require('@/static/img/gift66.jpg')" alt=""></li>
              </ul>
              <ul class="group">
                  <li class="unit" data-index="2"><img :src="require('@/static/img/gift7.jpg')" alt=""></li>
                  <li class="unit" data-index="3"><img :src="require('@/static/img/gift8.jpg')" alt=""></li>
                  <li class="unit" data-index="4"><img :src="require('@/static/img/gift9.jpg')" alt=""></li>
                  <li class="unit" data-index="5"><img :src="require('@/static/img/gift10.jpg')" alt=""></li>
              </ul>
          </div>
      </div>
    </div>
</template>

<script>

// import lottery from './r'

// export default {
//   name :'',
//   mounted() {
//     require('./r')
//   }
// }
</script>

<style>
/*抽奖外容器*/
.rotCont{
  width:6.22rem;background-color: #5ab7fa;padding:.1rem;box-sizing: border-box;margin:auto;border-radius: .2rem;box-shadow:0 0 .2rem .1rem rgba(255, 249, 179, .72)
}
#lottery{background-position:center center;background-repeat:no-repeat;background-size: 100% 100%;padding: 4%;}

.group-wrap{background: #5ab7fa;border-radius: .06rem;overflow: hidden}
.group-wrap ul{width:100%;display:flex;justify-content: space-between;}
.group-wrap ul li{border-radius: .12rem;width:1.2rem;height:1.73rem;overflow: hidden;flex:1;margin:.1rem;position:relative;}
.group-wrap ul li.active{box-shadow:0 0 0 .06rem #ff6363 }
.group-wrap ul li img{width:100%;height:100%;position: absolute;left:0;top:0;}
/* .group-wrap ul:nth-child(2){display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-flex-direction: column;flex-direction: column;} */

/*开始按钮*/
.group-wrap ul li.start{-webkit-box-flex:1;-webkit-flex:1;flex:1;background-position: center center; background-repeat:no-repeat;-webkit-background-size: cover;background-size: cover;cursor: pointer}
/* .group-wrap ul li.start:hover{background-image: url("http://s.mamhao.cn/app/activity/20160601/lottery/images/button-02.png");} */


/* #lottery{background-image: url("http://s.mamhao.cn/app/activity/20160601/lottery/images/bg-01.png");}
#lottery.blink{-webkit-animation: blink .5s linear infinite;animation: blink .5s linear infinite; }
@-webkit-keyframes blink {
    0%{background-image: url("http://s.mamhao.cn/app/activity/20160601/lottery/images/bg-01.png");}
    50%{background-image: url("http://s.mamhao.cn/app/activity/20160601/lottery/images/bg-02.png");}
    100%{background-image: url("http://s.mamhao.cn/app/activity/20160601/lottery/images/bg-01.png");}
}
@keyframes blink {
    0%{background-image: url("http://s.mamhao.cn/app/activity/20160601/lottery/images/bg-01.png");}
    50%{background-image: url("http://s.mamhao.cn/app/activity/20160601/lottery/images/bg-02.png");}
    100%{background-image: url("http://s.mamhao.cn/app/activity/20160601/lottery/images/bg-01.png");}
} */
</style>
