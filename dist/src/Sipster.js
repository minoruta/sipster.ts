"use strict";
/**
 * mscdex/sipster & PJSUA2 APIs
 * @see {@link https://github.com/mscdex/sipster#api|mscdex/sipster API}
 * @see {@link http://www.pjsip.org/docs/book-latest/html/intro_pjsua2.html|PJSUA2-High Level API}
 */
Object.defineProperty(exports, "__esModule", { value: true });
const sipster = require("sipster");
const events_1 = require("events");
exports.DEFAULT_ACCOUNT_CONFIG = {
    priority: 0,
    regConfig: {
        registerOnAdd: true,
        contactParams: "",
        timeoutSec: 300,
        retryIntervalSec: 0,
        firstRetryIntervalSec: 0,
        randomRetryIntervalSec: 10,
        delayBeforeRefreshSec: 5,
        dropCallsOnFail: false,
        unregWaitMsec: 4000,
        proxyUse: 3,
    },
    sipConfig: {
        transportId: -1
    }
};
class Sipster {
    /**
     * @throws {Error}  the instance already exists
     * @throws {Error}  no config specified
     */
    static instance(config) {
        if (this._instance) {
            if (config)
                throw new Error('the instance already exists');
            return this._instance;
        }
        if (!config)
            throw new Error('no config specified');
        this._instance = new Sipster(config);
        return this._instance;
    }
    constructor(config) {
        sipster.init(config);
    }
    static get version() {
        return sipster.version;
    }
    get Transport() {
        return sipster.Transport;
    }
    get Account() {
        return sipster.Account;
    }
    get config() {
        return sipster.config;
    }
    get state() {
        return sipster.state;
    }
    get mediaActivePorts() {
        return sipster.mediaActivePorts;
    }
    get mediaMaxPorts() {
        return sipster.mediaMaxPorts;
    }
    start() {
        sipster.start();
    }
    createPlayer(filename, options) {
        return sipster.createPlayer(filename, options);
    }
    createRecorder(filename) {
        return sipster.createRecorder(filename);
    }
}
exports.Sipster = Sipster;
//# sourceMappingURL=Sipster.js.map