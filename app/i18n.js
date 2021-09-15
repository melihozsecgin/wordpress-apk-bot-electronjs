const path = require("path")
const electron = require('electron')
const fs = require('fs');
const Store = require(appRoot + "/app/storages/Storage");

let loadedLanguage = {};
let app = electron.app ? electron.app : electron.remote.app
app_locales = [
          {symbol: 'en', name: 'English'},
          {symbol: 'tr', name: 'Türkçe'}
]

var l = Store.getItem('selected_locale');
global.systemLocale = l ? l : app.getLocale().split('-')[0];

module.exports = i18n;

module.exports.i18n = i18n;

function i18n() {
    app_locales.forEach(function(l){
        loadedLanguage[l.symbol] = JSON.parse(fs.readFileSync(path.join(__dirname, 'translations/' + l.symbol + '.json'), 'utf8'))
    })
}

i18n.prototype.__ = function(phrase) {
    if (app_locales.filter(function(x) { return x.symbol == systemLocale; }).length == 0) {
        systemLocale = 'en'
    }
    let translation = loadedLanguage[systemLocale][phrase]
    if(translation === undefined) {
         translation = phrase
    }
    return translation
}
