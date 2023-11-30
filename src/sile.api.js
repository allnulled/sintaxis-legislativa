(function(factory) {
    const mod = factory();
    if(typeof window !== "undefined") {
        window.Sile_api = mod;
    }
    if(typeof global !== "undefined") {
        global.Sile_api = mod;
    }
    if(typeof module !== "undefined") {
        module.exports = mod;
    }
})(function() {
    return {
        sqlstring: require("./sqlstring.js"),
        parser: require("./sile.parser.js"),
        api: {}
    };

});