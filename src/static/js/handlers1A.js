import BrowserChecker from '@/bag/utils/BrowserChecker'
import * as HandlersSupport from '@/static/js/handlersSupport'
// import {loadImg, showErrMsg, hideErrMsg, showSelectBox, hideSelectBox} from './pluginsSupport'
// import {config} from '@/config/commonConfig'

export default class Handlers {
  // 初始化基本状态
  static myApp = {
   isIos: BrowserChecker.isIos(),
   isAnd: BrowserChecker.isAndroid(),
   inState: '-outApp',
   isInApp: false,
   version: '',
   eventName: '2019gaokao'
  }
  static assignMyApp(obj) {
    Handlers.myApp = Object.assign({}, Handlers.myApp, obj)
  }
  static vm = {}
  static checkAppInfo() { return HandlersSupport.checkAppInfo() }
  static pickImg(sucCb, vue) { HandlersSupport.pickImg(sucCb, vue) }
  static renderFileChangedImg(a, b) { return HandlersSupport.renderFileChangedImg(a, b) }
}
