var fs = require('fs');
var request = require('sync-request');
var sleep = require('sleep');

var text = fs.readFileSync('/dev/stdin').toString();

// All words
var words = text.match(/[a-zA-ZöäüõÖÄÜÕšŠžŽ]+/g);

// Array of unique ones
var uniqWords = {};
words.forEach(function(w) {
    uniqWords[w] = true;
});
uniqWords = Object.keys(uniqWords);

// Sort by length
uniqWords.sort(function(a, b) {
    if (a.length > b.length) {
        return 1;
    }
    else if (a.length < b.length) {
        return -1;
    }
    else {
        return 0;
    }
});

var longWords = uniqWords.filter(function(w) {
    return w.length === 6;
}).reverse();

// console.log(words.length);
// console.log(uniqWords.length);
// console.log(longWords.length);

longWords.forEach(function(word, i) {
    var res = request('GET', 'http://www.filosoft.ee/hyph_et/hyph.cgi?word='+encodeURIComponent(word));
    var hyphenated = res.getBody("utf-8").match(/<strong>S&otilde;na poolitatakse:<\/strong><br>(.*?)<br><br>/)[1];

    if (/-/.test(hyphenated)) {
        console.log("." + hyphenated.replace(/-/g, "1") + ".")
    }
    else {
        console.log("FAILED TO HYPHENATE: " + word);
    }

    if (i % 50 === 0) {
        sleep.sleep(3);
    }
});


