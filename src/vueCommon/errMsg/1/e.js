// let _touch = 'createTouch' in document ? 'touchend' : 'click'
let _touch = 'click'

export function showErrMsg(val){
  $('.errMsg var').text(val)
  $('.errMsg').css('display', 'flex')
  $('.errMsg .wpr,.errMsg').bind(_touch, function(e){
    e.stopPropagation()
  })
  $('.errMsg').bind(_touch, function(){
    hideErrMsg()
  })
  $('.errMsg .close').bind(_touch, function(){
    hideErrMsg()
  })
}

export function hideErrMsg(){
  $('.errMsg,.mask').css('display', 'none')
  $('.errMsg .wpr,.errMsg').unbind(_touch)
  $('.errMsg').unbind(_touch)
  $('.errMsg .close').unbind(_touch)
}
