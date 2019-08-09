import bridgeContext from "./bridgeContext";

export default class AbstractBridge {
    constructor() {
        return null;
    }

    static getInstance() {
        return null;
    }

    /**
     * Bridge 인스턴스 초기화
     * @private
     */
    _initInstance() {
        this.className = this.constructor.name;
        this.fullName = bridgeContext.getB612NativeContext().namespace + '.' + this.className;
        this.callback = {};
        this.callback.fullName = this.fullName + '.callback';
        this._registerGlobal();
    }

    /**
     * AndroidBridge를 native에서 callback 함수를 호출할 수 있도록 window 객체로 등록한다.
     * @param instance
     * @private
     */
    _registerGlobal() {
        bridgeContext.getB612NativeContext()[this.className] = bridgeContext.getB612NativeContext()[this.className] || this;
    }

    /**
     * 전달된 이름의 callback을 등록하고 callback 함수의 full 명칭을 리턴한다.
     * @param callbackName : callback 함수 이름
     * @param userCallback : client code에서 지정한 callback 함수
     * @param resultType : bridge 호출 결과를 변환할 오브젝트 type을 지정하면 해당 type의 .from() 메소드를 호출해 변환한다.
     * @param additionalParams : userCallback 함수에 추가적으로 전달할 파라미터
     * @returns {string} : callback 함수의 full 명칭
     * @private
     */
    _registerCallback(callbackName, userCallback, resultType, ...additionalParams) {
        this.callback[callbackName] = (result) => {
            this._logResult(result, callbackName);
            let resultParsed = resultType ? resultType.from(result) : result;
            userCallback.apply(undefined, [resultParsed, ...additionalParams]);
        };
        return this._makeNativeCallbackName(callbackName);
    }

    /**
     * app에서 호출할 callback 메소드명을 namespace를 포함한 full 접근명으로 변환하여 리턴한다.
     * @param methodName
     * @returns {string}
     * @private
     */
    _makeNativeCallbackName(methodName) {
        return this.callback.fullName + '.' + methodName;
    }

    /**
     * app에서 callback으로 전달받은 result json을 parsing하여 logging 한다.
     * @param result
     * @param callbackName : 로깅할 callbackName 명칭
     * @private
     */
    _logResult(result, callbackName) {
        let _result = result;
        if (typeof result === 'string') {
            _result = result.substring(0, 1000);
        }
        //alert(`[Native callback][${callbackName}] : ${_result}`);
        console.log(`[Native callback][${callbackName}] : ${_result}`);
    }

    printThis() {
        console.log('--- print this below --- ');
        console.log(this);
        console.log('--- end of print this --- ');
    }
}
