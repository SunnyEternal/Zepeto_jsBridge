import BrowserChecker from "@/bag/utils/BrowserChecker";
import NullBridge from "./NullBridge";
import AndroidBridge from "./AndroidBridge";
import IosBridge from "./IosBridge";

export default class BridgeFactory {
    static getBridge() {
        if (BrowserChecker.isIos()) {
            return new IosBridge();

        } else if (window.B612KajiBridgeInterface != undefined && BrowserChecker.isAndroid()) {
            return new AndroidBridge();

        } else {
            return new NullBridge();
        }
    }
}
