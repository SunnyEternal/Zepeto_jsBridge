// import '@/bag/plugins/qr'

/*
支持图片圆角 需用
    var pattern = context.createPattern(image, "no-repeat");
    // 绘制一个圆
    context.roundRect(0, 0, image.width, image.height, input.value * 1 || 0);
    // 填充绘制的圆
    context.fillStyle = pattern;
    context.fill()
*/
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    var minSize = Math.min(w, h);
    if (r > minSize / 2) r = minSize / 2;
    // 开始绘制
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
}

export default class imgSupport{
  static imageRule = {
      minWidth: 200,
      minHeight: 200,
      minRatio: 0.46,
      maxRatio: 2.2
  }
  // inputfile 转src = inputfile2url(files[0])
  static inputPath2url(file) {
      var url = null;
      if (window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file);
      } else if (window.URL != undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
      }
      return url;
  }
  // 链接转二维码图片 el：jsdom 生成到这个节点
  // 需添加 import '@/bag/plugins/qr'
  // new QRCode(document.getElementById('qrcode'), 'your content');
  static createQr(el, url) {
    el.innerHTML = ''
    return new QRCode(el, {
      text: url,
      width: 128,
      height: 128,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    })
    // $(el).find('img')[0].crossOrigin = 'Anonyous'
  }
  // 给图片上添加二维码
  static addQr(_this){
    var canvas = document.createElement("canvas");
    canvas.style.width = '750px'
    canvas.style.height = '1000px'
    var context = canvas.getContext('2d')
    var backingStore = context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;
    var ratio = (window.devicePixelRatio || 1) / backingStore; //定义任意放大倍数 支持小数
    var scale = ratio > 2 ? ratio : 2;
    console.log(ratio, scale);
    canvas.width = 750 * scale//定义canvas 宽度 * 缩放
    canvas.height = 1000 * scale//定义canvas 高度 *缩放
    context.scale(scale, scale)//获取context,设置scale
    context.mozImageSmoothingEnabled = false
    context.webkitImageSmoothingEnabled = false
    context.msImageSmoothingEnabled = false
    context.imageSmoothingEnabled = false

    context.drawImage(_this, 0, 0, 750, 1000);
    // context.drawImage(qr, 0, 0, 260, 260, 602, 852, 135, 135);
    context.drawImage(qr, 0, 0, 260, 260, 13, 856, 132, 132);
    return Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height);
    // return _img
  }
  static validationImageSize(width, height) {
      if (width == 0 || height == 0) {
          return false
      }
      if (width >= height && height < imgSupport.imageRule.minWidth) {
          // Logger.error("too small image: width " + width, 5);
          return false
      }
      if (width < height && width < imgSupport.imageRule.minHeight) {
          // Logger.error("too small image: height " + height, 5);
          return false
      }
      const imageRatio = width / height;
      if (imageRatio < imgSupport.imageRule.minRatio || imageRatio > imgSupport.imageRule.maxRatio) {
          // Logger.error("invalid image ratio: " + imageRatio, 5);
          return false
      }
      return true
  }
  // 将即将上传的图片裁切实用部分
  // 图片展示框 用户可放大滑动 其实只用了中间部分裁取要上传的图片越小越好
  static cutAutoImage(src) {
    return new Promise((resolve, reject) => {
      let drawCanvas = document.createElement('canvas')
      let ctx = drawCanvas.getContext('2d')
      var backingStore = ctx.backingStorePixelRatio ||
                  ctx.webkitBackingStorePixelRatio ||
                  ctx.mozBackingStorePixelRatio ||
                  ctx.msBackingStorePixelRatio ||
                  ctx.oBackingStorePixelRatio ||
                  ctx.backingStorePixelRatio || 1;
      var ratio = (window.devicePixelRatio || 1) / backingStore;
      // console.log('ratio', ratio, $('#dropArea')[0].clientWidth, $('#dropArea')[0].clientHeight, $('#dropImg').offset().width, $('#dropImg').css('left'));
      let dropAreaWidth = $('#dropArea')[0].clientWidth
      let dropAreaHeight = $('#dropArea')[0].clientHeight

      let img = new Image()
      img.src = src
      // img.crossorigin = 'Anonymous'
      img.onload = function () {
        //  缩放比
        var origin2AutoRatio;
        if ($('#dropImg').css('width') == '100%'){
          origin2AutoRatio = this.width / parseFloat($('#dropImg').offset().width)
        } else {
          origin2AutoRatio = this.height / parseFloat($('#dropImg').offset().height)
        }
        let autoImgOffsetLeft = Math.abs(parseFloat($('#dropImg').css('left')))
        let autoImgOffsetTop = Math.abs(parseFloat($('#dropImg').css('top')))

        drawCanvas.style.width = (dropAreaWidth - 1) + 'px'
        drawCanvas.style.height = dropAreaHeight + 'px'
        var scale = ratio > 2 ? ratio : 2;
        // var scale = 2;
        drawCanvas.width = (dropAreaWidth - 1) * scale
        drawCanvas.height = dropAreaHeight * scale
        ctx.scale(scale, scale)
        // 看是否有必要降低清晰度
        // ctx.mozImageSmoothingEnabled = false
        // ctx.webkitImageSmoothingEnabled = false
        // ctx.msImageSmoothingEnabled = false
        // ctx.imageSmoothingEnabled = false
        // console.log(this);
        ctx.drawImage(this, autoImgOffsetLeft * origin2AutoRatio, autoImgOffsetTop * origin2AutoRatio, dropAreaWidth * origin2AutoRatio, dropAreaHeight * origin2AutoRatio, 0, 0, dropAreaWidth, dropAreaHeight)

        let img = Canvas2Image.convertToJPEG(drawCanvas, dropAreaWidth * scale, dropAreaHeight * scale)
        var _img = new Image();
        _img.src = img.src;
        _img.onload = function(){
          resolve(this)
          console.log('CutAutoImage length:', img.src.length, 'scale:', scale, 'ratio:', ratio, img.width, img.height);
        }
      }
    })
  }
  // imgs to canvas 绘图
  static _html2canvas(target, cb){
    var cntElem = target
    var shareContent = cntElem//需要截图的包裹的（原生的）DOM 对象
    var width = shareContent.offsetWidth //获取dom 宽度
    var height = shareContent.offsetHeight //获取dom 高度
    var canvas = document.createElement('canvas')//创建一个canvas节点
    var scale = 1.6//定义任意放大倍数 支持小数
    canvas.width = width * scale//定义canvas 宽度 * 缩放
    canvas.height = height * scale//定义canvas高度 *缩放
    canvas.getContext('2d').scale(scale, scale)//获取context,设置scale
    var opts = {
        scale: scale, // 添加的scale 参数
        canvas: canvas, //自定义 canvas
        // logging: true, //日志开关，便于查看html2canvas的内部执行流程
        width: width, //dom 原始宽度
        height: height,
        allowTaint: true,
        // useCORS: true, // 【重要】开启跨域配置,
        onrendered: function(canvas) {
          // if(browserCheck.lowSysVersion() && browserCheck.isAnd()){
            console.log('>>>>> html2canvas onrendered');
            var context = canvas.getContext('2d')
            // 【重要】关闭抗锯齿
            context.mozImageSmoothingEnabled = false
            context.webkitImageSmoothingEnabled = false
            context.msImageSmoothingEnabled = false
            context.imageSmoothingEnabled = false
            // 【重要】默认转化的格式为png,也可设置为其他格式
            setTimeout(function(){
              var img = Canvas2Image.convertToPNG(canvas, canvas.width, canvas.height)
              // var url = canvas.toDataURL('image/png', 1.0)
              if (cb) {
                // var img = new Image()
                // img.crossOrigin = 'anonyous'
                // img.src = url
                cb(img)
              }
            }, 0)
          // }
        }
    }
    setTimeout(() => {
      html2canvas(shareContent, opts)
    })
  }
}
