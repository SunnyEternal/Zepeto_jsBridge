import BridgeParam from "./BridgeParam";

const types = {
    image: 'image',
    video: 'video',
    web: 'web'
};

export default class SaveShareParam extends BridgeParam {
    constructor(url = '', type = 'image', title = '', content = '', thumbnail = '') {
        super();
        if (!types[type]) throw `[illegal type] ${type}`;
        this.url = url;
        this.type = type;
        this.title = title;
        this.content = content;
        this.thumbnail = thumbnail
    }

    static get types() {
        return types;
    }
}
