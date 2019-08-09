// import SaveShareParam from "@/bag/bridge/param/SaveShareParam";
// import BridgeFactory from '@/bag/bridge/BridgeFactory'
// import EventCameraParam from '@/bag/bridge/param/EventCameraParam'
import BrowserChecker from '@/bag/utils/BrowserChecker'
// import MegaPixImage from '@/bag/plugins/megapix-image'
// 在app.vue里添加菜单dom 这里调用dom操作方法
// import {showSelectBox, hideSelectBox} from '@/bag/vueCommon/cameraMenu/2/c'
// import '@/bag/plugins/html2canvas/h2c'
import imgSupport from '@/bag/utils/imgSupport'
import config from '@/config/index'
import vm from '../../main'

// let modList = [require('@/static/img/m-mod1.jpg'), require('@/static/img/m-mod2.jpg'), require('@/static/img/m-mod3.jpg'), require('@/static/img/m-mod4.jpg'),
// require('@/static/img/w-mod1.jpg'), require('@/static/img/w-mod2.jpg'), require('@/static/img/w-mod3.jpg'), require('@/static/img/w-mod4.jpg')]
 // 项目名+站内外 统计用
let EventFullPath = '???'

export default class Handlers {
  // 初始化基本状态
  static myApp = {
   inState: '-outApp',
   isInApp: false,
   version: '',
   dpr: window.devicePixelRatio,
   // sysVersion: w
   eventName: '2019手相'
  }

  // 检查app基本信息
  static checkAppInfo() {
    // console.log('>>checkAppInfo')
    if (BrowserChecker.isIos()) {
      Handlers.assignMyApp({isIos: true})
    } else if (BrowserChecker.isAndroid()) {
      Handlers.assignMyApp({isAnd: true})
    }
    EventFullPath = Handlers.myApp.eventName + Handlers.myApp.inState
    Handlers.assignMyApp({EventFullPath: Handlers.myApp.eventName + Handlers.myApp.inState})
    // BridgeFactory.getBridge().appInfo(res => {
    //   if (res.app) {
    //     let o = {
    //       isInApp : true,
    //       version : res.app,
    //       inState : '-inApp'
    //     }
    //     Handlers.assignMyApp(o)
    //     EventFullPath = Handlers.myApp.eventName + Handlers.myApp.inState
    //     Handlers.assignMyApp({EventFullPath: Handlers.myApp.eventName + Handlers.myApp.inState})
    //   }
    // })
    Handlers.myApp.isInApp = window.ZEPETO ? true : false
    Handlers.myApp.inState = window.ZEPETO ? '-inApp' : '-outApp'
    EventFullPath = Handlers.myApp.eventName + Handlers.myApp.inState
    Handlers.assignMyApp({EventFullPath: Handlers.myApp.eventName + Handlers.myApp.inState})
  }

  // 当有状态改变  修改基本信息
  static assignMyApp(obj) {
    Handlers.myApp = Object.assign({}, Handlers.myApp, obj)
  }

  // 选取照片第一步
  static pickImg(sucCb, that) {
    if (Handlers.myApp.isInApp) {
      const param = new EventCameraParam(
              EventCameraParam.types.imageCamera,
              EventCameraParam.cameraPositions.front,
              config.filterId,
              config.categoryId,
              config.stickerId,
              '',
              0
      );
      const galleryParams = new EventCameraParam(EventCameraParam.types.imageAlbum)
      showSelectBox(function(){
        $('#cameraBtn, #galleryBtn').off('click')
        $('#cameraBtn').one('click', () => {
          _hmt.push(['_trackEvent', EventFullPath, 'click', '开始相机拍照'])
          console.log(param);
          BridgeFactory.getBridge().eventCamera(param, Handlers.eventCameraCallback)
        })
        $('#galleryBtn').one('click', () => {
          _hmt.push(['_trackEvent', EventFullPath, 'click', '开始相册选取'])
          BridgeFactory.getBridge().eventCamera(galleryParams, Handlers.eventCameraCallback)
        })
      })
    } else {
      _hmt.push(['_trackEvent', EventFullPath, 'click', '开始选取照片'])
      $('#inputFile')[0].value = ''
      $('#inputFile').off("change").trigger('click')
      $('#inputFile').on('change', function(){
        return Handlers.fileChanged.call(this, sucCb, that)
      })
    }
  }

  /*
    站内 拍照、选图的回调
  */
  static eventCameraCallback(res, type){
    hideSelectBox()
    if (res.success) {
      vm.$loading.show(1, {'text': '图片处理中...'})
      let img = new Image()
      img.src = res.base64Image
      img.onload = function () {
        let _this = this
        // let imageType = this.src.split(",")[0].split(";")[0].split(":")[1].toLowerCase();
        // imageType = (imageType.indexOf("jpg") !== -1) ? 'image/jpeg' : imageType;
        if (!imgSupport.validationImageSize(this.width, this.height)) {
          vm.$loading.show(0)
          return vm.$reminder.show(1, {text: '图片尺寸或比例不符合'})
        }
        $('#bridgeImg')[0].src = this.src
        Handlers.ezGesture(_this)
      }
    }
  }

  /*
    站内站外的最后一步 选取完照片 添加拖动缩放功能
  */
  static ezGesture(Img) {
    $('#dropImg').css({'opacity': '0', 'width': 'auto', 'height': 'auto'})
    $('#dropImg')[0].src = Img.src
    var cropGesture = new EZGesture($('#dropArea')[0], $('#dropImg')[0], {
        targetMinWidth: Math.ceil($('#dropArea').offset().width),
        targetMinHeight: Math.ceil($('#dropArea').offset().height)
    });
    setTimeout(() => {
      console.log('targetMinWidth', Math.ceil($('#dropArea').offset().width), Math.ceil($('#dropArea').offset().height));
      console.log('targetDom', $('#dropImg')[0].offsetWidth, $('#dropImg')[0].offsetHeight);
      var imgOriginX = cropGesture.targetMinWidth == 0 ? ($('#dropImg').width() - $('#dropArea').width()) * 0.5 : ($('#dropImg').width() - cropGesture.targetMinWidth) * 0.5;
      var imgOriginY = cropGesture.targetMinHeight == 0 ? ($('#dropImg').height() - $('#dropArea').height()) * 0.5 : ($('#dropImg').height() - cropGesture.targetMinHeight) * 0.5;
      console.log(imgOriginX, imgOriginY);
      vm.$loading.show(0)
      // 初始时 将图片调至中间部分
      $('#dropImg').css({
        'left': '-' + imgOriginX + 'px',
        'top': '-' + imgOriginY + 'px',
        'opacity': '1'
      })
      vm.$myState.upload = true
    }, 300)
  }

  // 站外 选图的回调
  static fileChanged(sucCb, that){
    if (this.files.length <= 0){
      return
    } else if (!this.files[0].type.includes('image')) {
      // return alert('不支持此种类型的文件')
      return vm.$reminder.show(1, {text: '不支持此种类型的文件'})
    } else if (this.files[0].size > 10000000) {
      // return alert('文件太大了')
      return vm.$reminder.show(1, {text: '图片大小不得超过10M'})
    }
    vm.$loading.show(1, {'text': '图片处理中...'})
    let img = new Image()
    img.onload = function () {
      if (!imgSupport.validationImageSize(this.width, this.height)) {
        vm.$loading.show(0)
        return vm.$reminder.show(1, {text: '图片尺寸或比例不符合'})
      }
      // 站外合理限制图片尺寸最大不超过980
      Handlers.renderFileChangedImg(this, $('#bridgeImg')[0])
      .then(res => {
        Handlers.ezGesture($('#bridgeImg')[0])
      })
    }
    img.src = imgSupport.inputPath2url(this.files[0])
  }

  // file 站外图片渲染为合适尺寸 防止横向拍照图片
  static renderFileChangedImg(img, distImg) {
      return new Promise(function (resolve, reject) {
          EXIF.getData(img, _ => {
              var allMetaData = EXIF.getAllTags(img);
              var orientation = allMetaData.Orientation;

              var mpImg = new MegaPixImage(img);
              mpImg.render(distImg, {
                  maxWidth: 980,
                  maxHeight: 980,
                  // quality: 0.6,
                  orientation: orientation
              }, resolve)
          })
      })
  }

  static save(imgUrl){
    const param = new SaveShareParam(
      imgUrl,
      SaveShareParam.types.image
    )
    BridgeFactory.getBridge().save(param, () => {
      _hmt.push(['_trackEvent', EventFullPath, 'Btn', '保存图片'])
      vm.$toast.show(1, {text: '保存成功'})
    })
  }

  static share(imgUrl) {
    _hmt.push(['_trackEvent', EventFullPath, 'Btn', '分享图片'])
    let url = imgUrl
    const param = new SaveShareParam(url, SaveShareParam.types.image);
    var iosState = false
    BridgeFactory.getBridge().shareWithCallback(param, () => {
      if (!iosState){
        iosState = !iosState
        vm.$toast.show(1, {text: '保存成功'})
      }
    })
  }

  static sharePage() {
    let title = "王欢斌的皮 - title";
    let content = "拜年红包 解锁要红包的新姿势 -content"
    let url = 'http://www.baidu.com'
    let thumbnail = 'https://h5.kajicam.com/favicon.ico'

    let params = new SaveShareParam(url, SaveShareParam.types.web, title, content, thumbnail);
    BridgeFactory.getBridge().shareWithCallback(params, result => {
      alert('分享链接')
    })
  }

  static preloadImage(uri) {
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.src = uri
      // img.crossOrigin = 'anonyous'
      img.onload = function(){
        resolve(this)
      }
    })
  }

  static drawShareImg(drawArea, cb) {
    imgSupport._html2canvas(drawArea, (img) => {
      cb(img)
      // if (img.src.length < 40000) {
      //   Handlers.drawShareImg()
      // } else {
      //   cb(img)
      // }
    })
  }
}
