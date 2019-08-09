import axios from 'axios'
import config from '@/config/index'
let apiPre = config.ajaxPrefix
// console.log('apiPre:', apiPre)

let instance = axios.create({
  timeout: 20000
})

// 验证崽崽ID是否合法
export function correct(zepetoId) {
  return instance({
    method: 'GET',
    url: `${apiPre}/zepeto-server-api/api/zepeto/zaizaiId/correct?ids=${zepetoId}`
  })
  .then(res => {
    if (res.status == 200) {
      return res.data
    } else {
      throw Error('ajax 接口错误')
    }
  })
  .catch(err => {
    console.log(err);
  })
}

/*
 获取用户动作形象
type: 目前固定photobooth
width、height 宽高
characterHashCodes: 崽崽Id
renderData：模板id
2GUPPPVatyMAia8AogyiOm       逢考必过崽
4qJxCsI8tm2qegEAbfowMl          金榜题名崽
4kJBi54behSBty8yfqoxBU            超常发挥崽
1YMo0aqH0fd1kcMnxa3bZm       一路开挂崽
6WumctNIOof7NfW9YZndjR        考神附体崽
2LHUzQklfz6er97P5b2ZZS          绝版幸运崽
3Y28J7
 */

 export let allModsIndexArr = []

 let allMods = ['2GUPPPVatyMAia8AogyiOm', '4qJxCsI8tm2qegEAbfowMl', '4kJBi54behSBty8yfqoxBU', '1YMo0aqH0fd1kcMnxa3bZm', '6WumctNIOof7NfW9YZndjR', '2LHUzQklfz6er97P5b2ZZS']
 export function getUserActions({characterHashCodes = ''} = {}) {
   let arr = []
   allModsIndexArr = []
   while (true) {
     let randomIndex = parseInt(Math.random() * allMods.length)
     if (arr.length == 3) {
       break
     }
     if (!arr.includes(allMods[randomIndex])) {
       arr.push(allMods[randomIndex])
       allModsIndexArr.push(randomIndex)
     }
   }
   console.log('>>>>>', arr, allModsIndexArr);
   let promiseArr = arr.map((item, index) => {
     return getUserAction({renderData: item, characterHashCodes: characterHashCodes}).then(res => {
       // console.log(res);
       return res
     })
   })
   return Promise.all(promiseArr).then(res => {
     // console.log(res);
     return res
   }).catch(err => {
     console.log(err);
   })
 }

export function getUserAction({type = 'photobooth', width = 350, height = 350, characterHashCodes = [], renderData = ''} = {}) {
  return instance({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
      // 'activityName': 'gaokao'
    },
    url: `https://api-zepeto.kajicam.com/render-server`,
    data: {type: type, width: width, height: height, characterHashCodes: characterHashCodes, renderData: renderData},
    responseType: "arraybuffer"
  })
  .then(res => {
    if (res.status == 200) {
      return 'data:image/png;base64,' + btoa(
        new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
      )
    }
  })
  .catch(err => {
    console.log(err);
  })
}

export function imageUpload({zepetoId, base64}) {
  // let formData = new FormData()
  // formData.append('base64', base64)
  return instance({
    method: 'POST',
    // cache: false,
    url: `${apiPre}/zepeto-server-api/api/zepeto/expression/upload?uid=${zepetoId}&characterHashCodes=${zepetoId}`,
    // url: 'https://b612-static.kajicam.com/api/zepeto/expression/expression/upload?uid=' + zepetoId + '&characterHashCodes=' + zepetoId,
    // url:'https://api-zepeto-beta.kajicam.com/zepeto-server-api/api/zepeto/expression/upload?uid=MYKURU&characterHashCodes=MYKURU,lBJ5NK',
    // contentType: "application/json",
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: base64
  })
  .then(res => {
    console.log(res);
    if (res.status == 200) {
      if (res.data.code == 200) {
        return config.imagePrefix + res.data.data
      } else {
        throw new Error(res.data.msg)
      }
    }
  })
  .catch(err => {
    console.log(err);
  })
}

// 二进制图片转图片
// 方法一
//
// 复制代码
// var uInt8Array = new Uint8Array(xhr.response);
// var i = uInt8Array.length;
// var binaryString = new Array(i);
// while (i--) {
//     binaryString[i] = String.fromCharCode(uInt8Array[i]);
// }
// var data = binaryString.join('');
//
// var imageType = xhr.getResponseHeader("Content-Type");
// $('#image').attr("src", "data:" + imageType + ";base64," + data)
// 复制代码
// 方法二
//
// var imageType = xhr.getResponseHeader("Content-Type");
// var blob = new Blob([xhr.response], { type: imageType });
// var imageUrl = (window.URL || window.webkitURL).createObjectURL(blob);
// $('#image').attr("src", imageUrl);
