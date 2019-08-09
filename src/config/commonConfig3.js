import baseData from './index.js'

let indexData = baseData

var contentPath = 'inappBrowser?url=' + indexData.sitePrefix + `${indexData.activityDirName}/index.html`,
    storeUrl = indexData.downLink,
    b612UniversalLink = 'https://ul-b612.snowcam.cn/app/' + contentPath + '&storeURL=' + storeUrl,
    b612SchemeContentPath = indexData.scheme + contentPath;

export let config = {
    appInfo: {},
    scheme: indexData.scheme,
    uploadUrl:indexData.uploadUrl,
    imgProcess:indexData.imgProcess,
    imagePrefix:indexData.imagePrefix,
    ajaxPrefix:indexData.ajaxPrefix,
    filterId: indexData.filterId,
    categoryId: indexData.categoryId,
    stickerId: indexData.stickerId,
    renderedImagePrefix: "",
    siteUrl:indexData.siteUrl,
    imageRule: {
        minWidth: 200,
        minHeight: 200,
        maxWidth: 960,
        maxHeight: 960,
        minRatio: 0.46,
        maxRatio: 2.2
    },
    storeUrl:storeUrl,
    b612SchemeContentPath: b612SchemeContentPath,
    b612UniversalLink: b612UniversalLink,
    TIMEOUT:1200,
    validationImageSize: function (width, height) {
        return validationImageSize(this, width, height)
    },
    validationImageType: function (type) {
        return validationImageType(this, type);
    },
    getB612Context: function() {
        window.B612 = window.B612 || {};
        return window.B612;
    },
    toRenderedImageUrl(type) {
        return this.renderedImagePrefix + "_" + type + ".jpg";
    }
}

function validationImageType(context, type) {
    if (type !== 'image/png' && type !== 'image/jpeg') {
        return false;
    }
    return true;
}

let isIos = navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
let isAnd = navigator.userAgent.match(/Android/i) ? true : false;
export function tryToApp(){
    if (isIos) {
      setTimeout(function(){
        window.location.href = config.b612UniversalLink;
      }, 10)
    } else if (isAnd) {
      launchAndroid(config.b612SchemeContentPath, config.storeUrl, config.TIMEOUT)
    } else {
      // window.open(config.storeUrl)
      setTimeout(function(){
        window.location.href = config.storeUrl;
      }, 10)
    }
}

function launchAndroid(scheme, storeUrl, timeout){
  var iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = scheme
  document.body.appendChild(iframe)
  window.setTimeout(function () {
    document.body.removeChild(iframe)
  }, 10)
  window.setTimeout(function () {
    // window.open(storeUrl)
    setTimeout(function(){
      window.location.href = storeUrl;
    }, 10)
  }, timeout)
}

// WEBPACK FOOTER //
// ./src/js/data/appContext.js
