var fs = require('fs');
var request = require('sync-request');
var sleep = require('sleep');

var text = fs.readFileSync('/dev/stdin').toString();

// All words
var words = text.split(/\n/);

words.forEach(function(word) {
    var m = word.match(/\.(.*)\./);
    if (!m) {
        return;
    }

    var parts = m[1].split(/1/);

    if (parts[0].length < 3 && parts.length > 1) {
        parts = [ parts[0]+parts[1] ].concat(parts.slice(2));
    }

    var last = parts.length-1;
    if (parts[last].length < 3 && parts.length > 1) {
        parts = parts.slice(0, last-1).concat([ parts[last-1]+parts[last] ]);
    }

    // These can't be abbreviated
    if (parts.length === 1) {
        return;
    }

    console.log("."+parts.join("-")+".");
});
