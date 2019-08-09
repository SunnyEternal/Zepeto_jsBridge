
// <var class="musIcon"><img src="static/img/musIcon.png" alt="" width='100%'></var>
// new audio({src:music, icon:document.querySelector('#audio_control')})


export default class audio{
  constructor(arg){
    this.source = arg.source
    this.controlIcon = arg.icon
    this.isPlaying = true
    this._touch = ("createTouch" in document) ? "touchstart" : "click"
    this.touched = false
    this.init()
  }
  init() {
    // alert(this.src)
    var audio = document.getElementById('audio')
    audio.src = this.source
    audio.setAttribute('controls', 'controls')
    audio.setAttribute('loop', 'true')
    // audio.setAttribute('autoplay','true')
    // audio.setAttribute('id','audio')
    audio.load()
    document.body.appendChild(audio)
    this.audio = audio

    // <audio src="" controls loop id='audio'  style="position:absolute;top:0;top:-999rem;"></audio>
    this._play()
    $('body').on(this._touch, this.musicHandler.bind(this))
    // document.body.addEventListener(this._touch,this.musicHandler.bind(this),false);
    this.controlIcon.addEventListener(this._touch, (e) => {
      // alert(this.isPlaying)
      if (this.isPlaying) {
        this._pause()
      } else {
        this._play()
      }
      this.touched = true
      e.stopPropagation()
    }, false)
    this.visibility()
  }
  _play() {
    this.isPlaying = true
    this.controlIcon.classList.remove('pause')
    this.controlIcon.classList.add('play')
    alert('play')
    document.getElementById('audio').play()
    // let promise  = this.audio.play()
    // if (promise !== undefined) {
    //     promise.catch(error => {
    //         // Auto-play was prevented
    //         // Show a UI element to let the user manually start playback
    //         this._pause()
    //     }).then(() => {
    //       // this.audio.play()
    //     });
    // } else {
    //   if(this._pausenoPromise != null) {
    //     this._pausenoPromise()
    //     this._pausenoPromise = null
    //   }
    // }

    // this.audio.play().catch(err => {
    //   alert(0)
    //   this._pause()
    // })
  }
  _pausenoPromise() {
    this.isPlaying = false
    this.controlIcon.classList.remove('play')
    this.controlIcon.classList.add('pause')
  }
  _pause() {
    this.isPlaying = false
    this.controlIcon.classList.remove('play')
    this.controlIcon.classList.add('pause')
    alert('pause')
    document.getElementById('audio').pause()
  }
  musicHandler(ev) {
    // if(this.audio.paused == false || this.touched){
    //   return
    // }
    this._play()
    alert(0)
    $('body').off(this._touch)
    ev.stopPropagation()
  }
  visibility(){
    let _this = this
    if(!!document.visibilityState){
      document.addEventListener("visibilitychange", function () {
        var status = _this.isPlaying
        setTimeout(function(){
          if(document.visibilityState == 'hidden'){
              _this.audio.pause()
          }else if(document.visibilityState == 'visible'){
              status?_this._play():_this._pause()
          }
        },120)
      }, false);
    }
  }
}
