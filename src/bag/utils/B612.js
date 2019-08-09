import Logger from "./Logger";
import appContext from "../data/appContext";

/**
 * global로 노출할 함수 처리
 */
export default class B612 {
    static globalize() {
        const b612 = appContext.getB612Context();
        b612.logger = Logger;
    }
}




