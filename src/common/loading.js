export default function loading(state) {
  let loadDom = document.querySelector('.loading')
  if(state) {
    loadDom.classList.add('run')
    loadDom.style.display = 'block'
  } else {
    loadDom.style.display = 'none'
    loadDom.classList.remove('run')
  }
}
