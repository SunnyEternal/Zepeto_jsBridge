export default function loading(state, text = '') {
  let loadDom = document.querySelector('.loading')
  document.querySelector('.loading var').innerText = text
  // let loadingTimer
  if (state) {
    loadDom.classList.add('run')
    loadDom.style.display = 'flex'
    // loadingTimer = setInterval(function(){
    //   if (!window.navigator.onLine){
    //     loading(0)
    //     alert('请检查网络连接')
    //     clearInterval(loadingTimer)
    //   }
    // }, 20)
  } else {
    loadDom.style.display = 'none'
    loadDom.classList.remove('run')
    // clearInterval(loadingTimer)
  }
}
