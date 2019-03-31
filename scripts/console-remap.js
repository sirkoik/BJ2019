// console override function
// important for debugging in iOS if you don't have a mac

// idea courtesy liviu blidar
// https://stackoverflow.com/a/46529254

var console = (function(c) {
    return {
        log: function(text) {alert('LOG: ' + text);},
        info: function(text) {alert('INFO: ' + text);},
        warn: function(text) {alert('WARN: ' + text);},
        error: function(text) {alert('ERROR: ' + text);}
    }
})(window.console);

window.console = console;