export function loadImg(src) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.src = src
    img.onload = function() {
      resolve(this)
    }
    img.onerror = function(){
      alert('图片路径有误')
    }
  })
}

export function showSelectBox(cb){
  $('.firstPage_choose').css('display', 'flex')
  $('.firstPage_choose .wpr').one('click', function(e){
    e.stopPropagation()
  })
  $('.firstPage_choose').one('click', function(){
    hideSelectBox()
  })
  if(cb)cb()
}

export function hideSelectBox(cb){
  $('.firstPage_choose').css('display', 'none')
  $('.firstPage_choose .wpr').unbind('click')
  $('.firstPage_choose').unbind('click')
  if(cb)cb()
}

export function showErrMsg(txt) {
  // 统一弹出框
  $('.nextGuide .p1').empty().text(txt)
  $('.nextGuide').css('display', 'flex')
  $('.nextGuide .confirm').on('click', function(ev){
    hideErrMsg()
  })
}

export function hideErrMsg () {
  $('.nextGuide').css('display','none');
  $('.nextGuide .confirm').off('click');
}
