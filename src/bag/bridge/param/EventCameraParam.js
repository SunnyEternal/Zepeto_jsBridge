import BridgeParam from "./BridgeParam";
import BrowserChecker from '@/bag/utils/BrowserChecker'

const types = {
    imageCamera: 'imageCamera',
    imageAlbum: 'imageAlbum'
};

const cameraPositions = {
    front: '0',
    back: '1'
};

export default class EventCameraParam extends BridgeParam {
    constructor(type = '', cameraPosition = '', filterId = '', categoryId = '', stickerId = '', collageId = '', needParams = 1) {
        super();
        if (!types[type]) throw `[illegal type] ${type}`;
        if (!needParams && !BrowserChecker.isAndroid()) {
          return
        }
        this.type = type;
        this.cameraPosition = cameraPosition;
        this.filterId = filterId;
        this.categoryId = categoryId;
        this.stickerId = stickerId;
        this.collageId = collageId;
        this.autoDownload = 'true';
    }

    static get types() {
        return types;
    }

    static get cameraPositions() {
        return cameraPositions;
    }
}
