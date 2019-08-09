export default class AppInfo {
    constructor(app, os, deviceModel, language, country) {
        this.app = app;
        this.os = os;
        this.deviceModel = deviceModel;
        this.language = language;
        this.country = country;
    }

    static from(result) {
        const {app, os, deviceModel, language, country} = JSON.parse(result);
        return new AppInfo(app, os, deviceModel, language, country);
    }

}
