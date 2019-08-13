## 崽崽 jsBridge 文档

[Demo地址](https://sunnyeternal.github.io/Zepeto_jsBridge/bridge.html)

### 一、在崽崽App中打开h5调试页面：

不能通过浏览器链接唤醒，需要复制如下地址在App中设置的顶部空白处多次点击进入。
```
ZEPETO://HOME/WEBVIEW?url=h5链接
例如：ZEPETO://HOME/WEBVIEW?url=http://10.35.33.170:8088
```

### 二、关闭崽崽中h5页面：

```
<a href="ZEPETO://WEBVIEW/CLOSE">关闭图标<a>
```
            
### 三、引入jsBridge

```
// main.js
import Handlers from '@/utils/handlers' // 检测是否在站内并获取zepetoId
import renderOption from '@/bridge/params/renderOption' // 传参
import renderClass from '@/bridge/renderClass' // 生成人物形象模板
```
=>
```
1. 获取用户的崽崽Id
  let zepetoId = window.ZEPETO ? ZEPETO.userInfo.hashCode : '';
2. 站内外的判断：
  let isInApp = window.ZEPETO ? true : false;
  注释：获取window.ZEPETO有延迟，在ios中比较明显，有偶现获取不到的bug，当前比较稳妥的解决办法，就是延迟获取window.ZEPETO

3. 生成人物形象（不传参时默认生成两个人物的形象）
  let params = new renderOption({renderData: "4qJxCsI8tm2qegEAbfowMl", width: 400, height: 400, characterHashCodes: ["VLUFUV"]})

  renderClass.render(params).then(url => {
    let img = new Image();
    img.src = url;
    document.body.append(img);
  }).catch(err => {
    console.log(err)
  });
```
