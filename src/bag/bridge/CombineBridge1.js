export default class CombineImg {
	constructor({type="photobooth", renderData="4XF7OvHpnaEaOQsEUSkimi", width=512, height=512, bones=[], characterHashCodes=["MYKURU", "MYKURU"]}, callback, error) {
		this.type = type;
		this.renderData = renderData;
		this.width = width;
		this.height = height;
		this.bones = bones;
		this.characterHashCodes = characterHashCodes;
		this.callback = callback;
		this.error = error;
	}

	combRender () {
		let that = this;
		if (window.hasOwnProperty("ZEPETO")) {
			ZEPETO.invoke("Render", {type: this.type, renderData: this.renderData, width: this.width, height: this.height, bones: this.bones, characterHashCodes: this.characterHashCodes}, function (result) {
				if (!result.isSuccess) {
					that.error();
					return;
				}
				let bstr = window.atob(result.result);
				let n = bstr.length;
				let u8arr = new Uint8Array(n);
				while (n--) u8arr[n] = bstr.charCodeAt(n);
				let blob = new Blob([u8arr], { type: "image/png" }); 
				let url = URL.createObjectURL(blob);
				that.callback(url);
			}) 

		}else {
			document.addEventListener("ZepetoLoaded", that.callback)
		}
	}
}

// WaitZEPETO(callback) {
// 	if (window.hasOwnProperty("ZEPETO") == false) {
// 		document.addEventListener("ZepetoLoaded", callback);
// 	} else {
// 		callback();
// 	}
// }

// WaitZEPETO(function () {
// 	Render({
// 		"type": "photobooth",
// 		"renderData": "4XF7OvHpnaEaOQsEUSkimi",
// 		"width": 512,
// 		"height": 512,
// 		"bones": [
// 		],
// 		"characterHashCodes": [
// 			"MYKURU",
// 			"MYKURU"
// 		]
// 	}, url => {
// 		var img = new Image();
// 		img.src = url;
// 		img.style.width = '200px'
// 		document.body.appendChild(img);
// 	}, error => {
// 		console.log(error)
// 	})
// })

// {type="photobooth", renderData="4XF7OvHpnaEaOQsEUSkimi", width=512, height=512, bones=[], characterHashCodes=["MYKURU", "MYKURU"]}, callback, error