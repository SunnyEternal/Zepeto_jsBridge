import AbstractBridge from "./AbstractBridge";

let instance = null;

export default class NullBridge extends AbstractBridge {
    constructor() {
        super();
        if (!instance) {
            instance = this;
            super._initInstance(instance);
        }
        return instance;
    }

    appInfo(userCallback) {
        console.log('[NullBridge] appInfo');
    }

    save(saveShareParam, userCallback) {
        console.log('[NullBridge] save, param : ' + saveShareParam.toString());
    }

    shareWithCallback(saveShareParam, sharePoppedCallback, shareMediaClickedCallback) {
        console.log('[NullBridge] shareWithCallback, param : ' + saveShareParam.toString());
    }

    eventCamera(eventCameraParam, userCallback) {
        console.log('[NullBridge] eventCamera, param : ' + eventCameraParam.toString());
    }

	eventCameraWithLandmarks(eventCameraParam, userCallback) {
		console.log('[NullBridge] eventCamera, param : ' + eventCameraParam.toString());
    }

    getCameraImage(userCallback) {
        console.log('[NullBridge] getCameraImage');
    }

	getCameraImageWithLandmarks(userCallback) {
        console.log('[NullBridge] getCameraImage');
    }
}
