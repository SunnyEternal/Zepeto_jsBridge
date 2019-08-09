const bridgeContext = {
    bridgeNs1st: "B612",
    bridgeNs2nd: "Native",

    _initB612Context() {
        window[this.bridgeNs1st] = window[this.bridgeNs1st] || {};
        window[this.bridgeNs1st][this.bridgeNs2nd] = window[this.bridgeNs1st][this.bridgeNs2nd] || {};

        return window[this.bridgeNs1st][this.bridgeNs2nd];
    },

    getB612NativeContext() {
        const context = this._initB612Context();
        context.namespace = this.bridgeNs1st + "." + this.bridgeNs2nd;
        return context;
    }
};

export default bridgeContext
