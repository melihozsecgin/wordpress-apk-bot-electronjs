const $ = require("jquery");
const electron = require('electron');
const {ipcRenderer} = electron;
const {remote} = electron;
const Swal = require('sweetalert2');
global.appRoot = remote.getGlobal("appRoot");
global.version = remote.getGlobal("version");
global.userData = remote.getGlobal("userData");

var i18n = new (require(appRoot + '/app/i18n'))
systemLocale = remote.getGlobal("systemLocale");

$(document).ready(function () {
    setTooltips();
});

function setTooltips() {
    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
    })
}

function disposeTooltips() {
    $('[data-toggle="tooltip"]').tooltip('dispose');
}

module.exports = function () {
    this.$ = $;
    this.electron = electron;
    this.ipcRenderer = ipcRenderer;
    this.Swal = Swal;
    this.i18n = i18n;
    this.systemLocale = systemLocale;
}
