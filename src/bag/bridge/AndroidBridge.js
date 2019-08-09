import AbstractBridge from "./AbstractBridge";
import AppInfo from "./model/AppInfo";
import AppCommonResult from "./model/AppCommonResult";
import EventCameraResult from "./model/EventCameraResult";
import GetCameraResult from "./model/GetCameraResult";
import CameraResult from "./model/CameraResult";
import BrowserChecker from "@/bag/utils/BrowserChecker";

let instance = null;
let native = window.B612KajiBridgeInterface;

export default class AndroidBridge extends AbstractBridge {
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
        native.appInfo(callbackMethodFullName);
    }

    /**
     * 앱에게 이미지 또는 비디오를 전달하여 단말에 저장을 요청한다.
     * @param saveShareParam (@see ./param/SaveShareParam)
     * @param userCallback
     */
    save(saveShareParam, userCallback) {
        const callbackMethodFullName = this._registerCallback("save", userCallback, AppCommonResult);
        native.save(callbackMethodFullName, saveShareParam.toString());
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

        native.shareWithCallback(sharePoppedCallbackName,
            shareMediaClickedCallbackName,
            saveShareParam.toString());
    }

    /**
     * 앱으로 camera 나 gallery 호출을 요청한다.
     * @param eventCameraParam (@see ./param/EventCameraParam)
     * @param userCallback
     */
    eventCamera(eventCameraParam, userCallback) {
        //기획 변경 : 안드로이드의 경우에는 속도이슈로 Filter만 적용(Sticker 제외)
        if (BrowserChecker.isAndroid()) {
            // eventCameraParam.filterId = undefined;
            eventCameraParam.categoryId = undefined;
            eventCameraParam.stickerId = undefined;
        }

        const callbackMethodFullName = this._registerCallback(
            "eventCamera", userCallback, EventCameraResult, eventCameraParam.type, eventCameraParam.cameraPosition);

        native.eventCamera(callbackMethodFullName, eventCameraParam.toString(true));
    }

    eventCameraWithLandmarks(eventCameraParam, userCallback) {
        //기획 변경 : 안드로이드의 경우에는 속도이슈로 Filter만 적용(Sticker 제외)
        if (BrowserChecker.isAndroid()) {
            // eventCameraParam.filterId = undefined;
            eventCameraParam.categoryId = undefined;
            eventCameraParam.stickerId = undefined;
        }

        const callbackMethodFullName = this._registerCallback(
            "eventCameraWithLandmarks", userCallback, CameraResult, eventCameraParam.type, eventCameraParam.cameraPosition);

        native.eventCameraWithLandmarks(callbackMethodFullName, eventCameraParam.toString(true));
    }

    /**
     * 마지막으로 촬영한 사진을 가져온다.
     * @param userCallback
     */
    getCameraImage(userCallback) {
        const callbackMethodFullName = this._registerCallback("getCameraImage", userCallback, GetCameraResult);
        native.getCameraImage(callbackMethodFullName);
    }

    getCameraImageWithLandmarks(userCallback) {
        const callbackMethodFullName = this._registerCallback("getCameraImageWithLandmarks", userCallback, CameraResult);
        native.getCameraImageWithLandmarks(callbackMethodFullName);
    }

    close() {
        // const callbackMethodFullName = this._registerCallback("close", '', AppCommonResult);
        // const callbackMethodFullName = this._registerCallback("close", '', '');
        // native.close(callbackMethodFullName, saveShareParam.toString());
        native.close()
    }
}
