var console = (function(c) {
    return {
        log: function(text) {alert('LOG: ' + text);},
        info: function(text) {alert('INFO: ' + text);},
        warn: function(text) {alert('WARN: ' + text);},
        error: function(text) {alert('ERROR: ' + text);}
    }
})(window.console);

window.console = console;