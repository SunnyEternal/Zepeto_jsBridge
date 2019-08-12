import 'babel-polyfill'
import Handlers from '@/utils/handlers'
import renderOption from '@/bridge/params/renderOption'
import renderClass from '@/bridge/renderClass'

let appState = {
  isAnd: false,
  isIos: false,
  isInApp: false
}
let zepetoId = null

// 检测是否在app内 和 获取zepetoId
init();

function init() {
  let timer = setInterval(() => {
    Handlers.checkAppInfo()
    if (window.ZEPETO) {
      appState.isInApp = true
      zepetoId = window.ZEPETO.userInfo.hashCode || ''
      document.querySelector('.zepetoId').innerText = zepetoId
      appState.isIos = Handlers.myApp.isIos ? Handlers.myApp.isIos : false
      appState.isAnd = Handlers.myApp.isAnd ? Handlers.myApp.isAnd : false
      document.querySelector('.baseState').innerText = JSON.stringify(appState)
      console.log(appState)
      clearInterval(timer) 
    }
  }, 20)

  setTimeout(() => {
    clearInterval(timer)
  }, 1500)
}

// 生成单个人物形象
let combineBtn1 = document.querySelector('#combine')
combineBtn1.onclick = function () {
  // 在App内
  if (!Handlers.myApp.isInApp) {
    return document.querySelector('.combineImg').innerText = '请在App中尝试'
  }
  let params = new renderOption({renderData: "4qJxCsI8tm2qegEAbfowMl", width: 400, height: 400, characterHashCodes: ["VLUFUV"]})
  renderClass.render(params).then(url => {
    let img = new Image();
    img.src = url;
    document.querySelector('.combineImg').append(img);
  }).catch(err => {
    console.log(err)
  });
}

// 生成两个人物形象
let combineBtn2 = document.querySelector('#combineTwo')
combineBtn2.onclick = function () {
  // 在App内
  if (!Handlers.myApp.isInApp) {
    return document.querySelector('.combineImgTwo').innerText = '请在App中尝试'
  }
  let params = new renderOption({width: 400, height: 400})
  renderClass.render(params).then(url => {
    let img = new Image();
    img.src = url;
    document.querySelector('.combineImgTwo').append(img);
  }).catch(err => {
    console.log(err)
  });
}
