export default new class renderClass{
  render(option){
    // this.WaitZEPETO(this._Render.call())
    return new Promise((resolve, reject) => {
      if (window.hasOwnProperty("ZEPETO") == false) {
        document.addEventListener("ZepetoLoaded", ()=>{
          this._Render(option, resolve, reject);
        });
      } else {
        this._Render(option, resolve, reject);
      }
    })
  }
  _Render(message, resolve, reject) {
    // TODO : 제페토 인앱일 경우에는 앱에 있는걸 사용하도록..
    if (window.hasOwnProperty("ZEPETO")) {

      ZEPETO.invoke("Render", message, function (result) {
        if (!result.isSuccess) {
          reject(new Error('渲染失败'));
          return;
        }
        var bstr = window.atob(result.result);
        var n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        var blob = new Blob([u8arr], { type: "image/png" });
        var url = URL.createObjectURL(blob);
        resolve(url);
      });
      
    }
  }
}
