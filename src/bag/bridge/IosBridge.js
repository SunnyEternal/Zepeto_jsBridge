import AbstractBridge from "./AbstractBridge";
import ConfigFactory from "@/config/index"
import AppInfo from "./model/AppInfo";
import AppCommonResult from "./model/AppCommonResult";
import CameraResult from "./model/CameraResult";

let instance = null;

export default class IosBridge extends AbstractBridge {
    constructor() {
        super();
        if (!instance) {
            instance = this;
            super._initInstance(instance);
        }
        return instance;
    }

    /**
     * app 정보 요청 (정확히 어떤 정보 ?)
     * @param userCallback
     *    : callback param 0 - ./model/AppInfo
     */
    appInfo(userCallback) {
        const callbackMethodFullName = this._registerCallback("appInfo", userCallback, AppInfo);
        this._calliOSFunction("appInfo", null, callbackMethodFullName);
    }

    /**
     * 앱에게 이미지 또는 비디오를 전달하여 단말에 저장을 요청한다.
     * @param saveShareParam (@see ./param/SaveShareParam)
     * @param userCallback
     */
    save(saveShareParam, userCallback) {
        const callbackMethodFullName = this._registerCallback("save", userCallback, AppCommonResult);
        this._calliOSFunction("save", saveShareParam, callbackMethodFullName);
    }

    /**
     * 앱에게 이미지 또는 비디오를 전달하여 공유를 요청한다.
     * @param saveShareParam (@see ./param/SaveShareParam)
     * @param sharePoppedCallback - app에서 공유 div를 보여준 후 호출되는 callback
     * @param shareMediaClickedCallback - app에서 share 매체를 선택한 후 callback (호출되지 않는데 ??)
     */
    shareWithCallback(saveShareParam, sharePoppedCallback, shareMediaClickedCallback) {
        const sharePoppedCallbackName = this._registerCallback('sharePoppedCallback', sharePoppedCallback, AppCommonResult);
        const shareMediaClickedCallbackName = this._registerCallback('shareMediaClickedCallback', shareMediaClickedCallback, AppCommonResult);

        const options = JSON.parse(saveShareParam.toString());
        options.clickShareButton = shareMediaClickedCallbackName;

        this._calliOSFunction("share", options, sharePoppedCallbackName);
    }

    /**
     * 앱으로 camera 나 gallery 호출을 요청한다.
     * @param eventCameraParam (@see ./param/EventCameraParam)
     * @param userCallback
     */
    eventCamera(eventCameraParam, userCallback) {
        const callbackMethodFullName = this._registerCallback("eventCamera", userCallback,
            CameraResult, eventCameraParam.type, eventCameraParam.cameraPosition);

        this._calliOSFunction("eventCamera", eventCameraParam, callbackMethodFullName);
    }

    eventCameraWithLandmarks(eventCameraParam, userCallback) {
        const callbackMethodFullName = this._registerCallback("eventCameraWithLandmarks", userCallback,
            CameraResult, eventCameraParam.type, eventCameraParam.cameraPosition);

        this._calliOSFunction("eventCameraWithLandmarks", eventCameraParam, callbackMethodFullName);
    }

    /**
     * 마지막으로 촬영한 사진을 가져온다.
     * @param userCallback
     */
    getCameraImage(userCallback) {
        const callbackMethodFullName = this._registerCallback("getCameraImage", userCallback, CameraResult);
        this._calliOSFunction("getCameraImage", null, callbackMethodFullName);
    }

    getCameraImageWithLandmarks(userCallback) {
        const callbackMethodFullName = this._registerCallback("getCameraImageWithLandmarks", userCallback, CameraResult);
        this._calliOSFunction("getCameraImageWithLandmarks", null, callbackMethodFullName);
    }

    close() {
        // const callbackMethodFullName = this._registerCallback("getCameraImageWithLandmarks", userCallback, CameraResult);
        this._calliOSFunction("close", null, null);
    }

    /**
     * ios app과 연동하기 위한 method
     * (app scheme을 통해 연동)
     *
     * @param functionName - app과 정의된 function name
     * @param args - 전달할 argument object
     * @param sCallback - app에서 호출해줄 callback 명
     * @private
     */
    _calliOSFunction(functionName, args, sCallback) {
        let url = ConfigFactory.scheme + "native/";
        const callInfo = {};
        callInfo.functionName = functionName;
        if (sCallback) {
            callInfo.success = sCallback;
        }
        if (args) {
            callInfo.args = args;
        }
        url += JSON.stringify(callInfo);

        this._openCustomURLinIFrame(url);
    }

    _openCustomURLinIFrame(src) {
        const rootElm = document.documentElement;
        const newFrameElm = document.createElement("IFRAME");

        newFrameElm.setAttribute("src", src);
        rootElm.appendChild(newFrameElm);
        newFrameElm.parentNode.removeChild(newFrameElm);
    }

}
