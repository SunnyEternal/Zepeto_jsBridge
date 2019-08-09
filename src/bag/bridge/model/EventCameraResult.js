export default class EventCameraResult {
    constructor(base64Image, success) {
        this.base64Image = base64Image;
        this.success = success;
    }

    static from(base64Image) {
        if (base64Image) {
            return new EventCameraResult(base64Image, true);
        } else {
            return new EventCameraResult(base64Image, false);
        }
    }
}
