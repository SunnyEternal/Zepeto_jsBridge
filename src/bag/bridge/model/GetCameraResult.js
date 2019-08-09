export default class GetCameraResult {
    constructor(base64Image, success) {
        this.base64Image = base64Image;
        this.success = success;
    }

    static from(base64Image) {
        if (base64Image) {
            return new GetCameraResult(base64Image.replace(/\n/gi, ""), true);
        } else {
            return new GetCameraResult(base64Image, false);
        }
    }
}
