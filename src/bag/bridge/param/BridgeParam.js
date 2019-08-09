export default class BridgeParam {

    /**
     * 파라미터 오브젝트를 json string 으로 변환한다.
     *
     * @param clearEmpty - true인 경우 값이 없다면(빈 스트링 포함) 해당 key를 제외한다. (default: false)
     * @returns {string}
     */
    toString(clearEmpty) {
        if (clearEmpty) {
            return JSON.stringify(this, (key, value) => {
                if (!value) {
                    return undefined;
                } else {
                    return value;
                }
            });
        } else {
            return JSON.stringify(this);
        }
    }
}
