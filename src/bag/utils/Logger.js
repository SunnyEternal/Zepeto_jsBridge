let remoteLoggingEnabled = false;

export default class Logger {

    static log(...message) {
        if(!message) return;
        if(message.length === 1) {
            console.log(">>B6>> %o", message[0]);
        } else {
            const newMessage = message.slice(1);
            newMessage.unshift(">>B6>> " + message[0]);
            console.log.apply(console, newMessage);
        }
    }

    static error(...message) {
        if(!message) return;
        if(message.length === 1) {
            console.error(">>B6.ERR>> %o", message[0]);
        } else {
            const newMessage = message.slice(1);
            newMessage.unshift(">>B6.ERR>> " + message[0]);
            console.error.apply(console, newMessage);
        }
    }

    static enableRemoteLogging() {
        if(remoteLoggingEnabled) return;
        remoteLoggingEnabled = true;

        const proxyParam = console;

        (function() {
            const proxy = proxyParam.log;
            console.log = function(msg) {
                proxy.apply(this, arguments);
            }
        })();

        (function() {
            const proxy = proxyParam.error;
            console.error = function(msg) {
                proxy.apply(this, arguments);
            }
        })();

        (function() {
            const proxy = proxyParam.info;
            console.info = function(msg) {
                proxy.apply(this, arguments);
            }
        })();

        (function() {
            const proxy = proxyParam.warn;
            console.warn = function(msg) {
                proxy.apply(this, arguments);
            }
        })();

        (function() {
            const proxy = proxyParam.dir;
            console.dir = function(msg) {
                proxy.apply(this, arguments);
            }
        })();
    }
}
