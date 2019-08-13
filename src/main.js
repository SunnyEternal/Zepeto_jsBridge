import 'babel-polyfill'
import loading from '@/common/loading.js'
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
loading(1)
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
      loading(0)
      clearInterval(timer) 
    }
  }, 20)

  setTimeout(() => {
    loading(0)
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
  loading(1)
  let params = new renderOption({renderData: "4qJxCsI8tm2qegEAbfowMl", characterHashCodes: [zepetoId]})
  renderClass.render(params).then(url => {
    let img = new Image();
    img.src = url;
    img.style.width = '100%';
    document.querySelector('.combineImg').append(img);
    loading(0)
  }).catch(err => {
    console.log(err)
    loading(0)
  });
}

// 生成两个人物形象
let combineBtn2 = document.querySelector('#combineTwo')
combineBtn2.onclick = function () {
  // 在App内
  if (!Handlers.myApp.isInApp) {
    return document.querySelector('.combineImgTwo').innerText = '请在App中尝试'
  }
  loading(1)
  let params = new renderOption({renderData: "4XF7OvHpnaEaOQsEUSkimi", characterHashCodes: [zepetoId, 'VLUFUV']})
  console.log(params)
  renderClass.render(params).then(url => {
    let img = new Image();
    img.src = url;
    img.style.width = '100%';
    document.querySelector('.combineImgTwo').append(img);
    loading(0)
  }).catch(err => {
    console.log(err)
    loading(0)
  });
}
