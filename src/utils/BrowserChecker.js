export default class BrowserChecker {
    static isIos() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    }

    static isAndroid() {
        return navigator.userAgent.match(/Android/i) ? true : false;
    }

    static isIosOrAndroid() {
        console.log('[navigation.userAgent] : ' + navigator.userAgent);
        return BrowserChecker.isIos() || BrowserChecker.isAndroid();
    }

    static isIosLowerThan11() {
        let result = false;
        if (BrowserChecker.isIos()) {
            const majorVersion = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)[1];
            result = majorVersion <= 10;
        }
        return result;
    }

    static isIos8or9() {
        const ua = navigator.userAgent;
        return (ua.indexOf('OS 8_') >= 0 || ua.indexOf('OS 9_') >= 0);
    }
    static lowSysVersion() {
      // 苹果机
      if (BrowserChecker.isIos()) {
        let iosLimitVersion = [10, 2, 2]
        let iosVersionArr = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/)
        iosVersionArr.shift()
        for (let i = 0; i < iosLimitVersion.length; i++) {
          let cur = parseInt(iosVersionArr[i], 10) || 0
          let limit = parseInt(iosLimitVersion[i], 10) || 0
          if (cur < limit) {
            return true
          } else if (cur > limit) {
            return false
          }
        }
        return false
      } else if (BrowserChecker.isAndroid()) {
        let andrLimitVersion = [4, 5, 0]
        let andrVersionArr = navigator.userAgent.match(/Android (\d+)\.(\d+)\.?(\d+)?/)

        andrVersionArr.shift()
        for (let i = 0; i < andrLimitVersion.length; i++) {
          let cur = parseInt(andrVersionArr[i], 10) || 0
          let limit = parseInt(andrLimitVersion[i], 10) || 0
          if (cur < limit) {
            return true
          } else if (cur > limit) {
            return false
          }
        }
        return false
      }
    }
}
