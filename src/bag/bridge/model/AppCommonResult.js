export default class AppCommonResult {
    constructor(success) {
        this.success = success;
    }

    static from(result) {
        const {success} = JSON.parse(result);
        return new AppCommonResult(success);
    }

}
