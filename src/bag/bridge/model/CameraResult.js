export default class CameraResult {
    constructor({success, base64Image, url, landmarks}) {
        this.success = success;
        this.base64Image = base64Image;
        this.url = url; // only from IOS eventCamera result
        this.landmarks = JSON.stringify(landmarks);
    }

    static from(result) {
        return new CameraResult(JSON.parse(result));
    }
}
