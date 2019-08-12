import BrowserChecker from '@/utils/BrowserChecker'

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
   eventName: ''
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
    Handlers.myApp.isInApp = window.ZEPETO ? true : false
    Handlers.myApp.inState = window.ZEPETO ? '-inApp' : '-outApp'
    EventFullPath = Handlers.myApp.eventName + Handlers.myApp.inState
    Handlers.assignMyApp({EventFullPath: Handlers.myApp.eventName + Handlers.myApp.inState})
  }

  // 当有状态改变  修改基本信息
  static assignMyApp(obj) {
    Handlers.myApp = Object.assign({}, Handlers.myApp, obj)
  }
}
