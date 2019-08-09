export function Render(message, callback, error) {
	// TODO : 제페토 인앱일 경우에는 앱에 있는걸 사용하도록..	
	if (window.hasOwnProperty("ZEPETO")) {
		ZEPETO.invoke("Render", message, function (result) {
			if (!result.isSuccess) {
				error();
				return;
			}
      let bstr = window.atob(result.result);
			let n = bstr.length;
			let u8arr = new Uint8Array(n);
			while (n--) u8arr[n] = bstr.charCodeAt(n);
			let blob = new Blob([u8arr], { type: "image/png" }); 
			let url = URL.createObjectURL(blob);
			callback(url);
		});
	}
}

export function WaitZEPETO(callback) {
	if (window.hasOwnProperty("ZEPETO") == false) {
		document.addEventListener("ZepetoLoaded", callback);
	} else {
		callback();
	}
}

WaitZEPETO(function () {
	Render({
		"type": "photobooth",
		"renderData": "4XF7OvHpnaEaOQsEUSkimi",
		"width": 512,
		"height": 512,
		"bones": [
		],
		"characterHashCodes": [
			"MYKURU",
			"MYKURU"
		]
	}, url => {
		var img = new Image();
		img.src = url;
		img.style.width = '200px'
		document.body.appendChild(img);
	}, error => {
		console.log(error)
	})
})