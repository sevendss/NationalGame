﻿var scripts = document.getElementsByTagName('script');
var currentScript = scripts[scripts.length - 1];

currentScript.id = ((currentScript.id.length === 0) ? "mgsProgressiveTickerArrayScript" : currentScript.id);

function cleanQueryString(querystring) {
    querystring = querystring.replace(/^[^\?]+\??/, '');
    return querystring.toLowerCase();
}

var lowerQueryString = cleanQueryString(currentScript.src);

function parseQueryString(queryString) {
    var queryStringParams = {};
    if (!queryString) { return "{}"; }
    var queryStringPairs = queryString.split(/[;&]/);

    for (var i = 0; i < queryStringPairs.length; i++) {
        var KeyVal = queryStringPairs[i].split('=');
        if (!KeyVal || KeyVal.length !== 2) { continue; }

        var key = unescape(KeyVal[0]);
        var val = unescape(KeyVal[1]);
        val = val.replace(/\+/g, ' ');
        queryStringParams[key] = val;
    }

    return queryStringParams;
}

var params = parseQueryString(lowerQueryString);

function getParam(id, defaultValue) {
    return ((params[id]) ? params[id] : defaultValue);
}

function cleanHTML(data) {
    if (!data) { return; }
    var txt = '';
    for (var i = 0; i < data.length; i++) {
        if (txt.length > 0) { txt += " "; }
        txt += data[i];
    }

    return txt;
}

renderTicker = new function () {
    this.init = function (lowerQueryString) {
        document.write("<div id='progressiveTicker" + (getParam('progid', 'jackpot')) + "'></div>");
        var controlScript = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));

        controlScript.id = "mgsProgressiveTickerAsmxScript";
        controlScript.setAttribute("type", "text/javascript");
        controlScript.src = ((window.location.protocol == 'https:') ? "https://" : "http://") + "www.tickerassist.co.uk/ProgressiveTickers/WebServiceProgressiveTicker.asmx/renderTicker?form=json&booIsSecure=" + ((window.location.protocol == 'https:') ? true : false) + "&strProgId=" + getParam('progid', 'jackpot') + "&booShowLogo=" + getParam('showlogo', true) + "&booShowCasino=" + getParam('showcasino', false) + "&booShowOnlyCasino=" + getParam('showonlycasino', false) + "&strFontFamily=" + getParam('font-family', null) + "&intFontSize=" + getParam('font-size', 0) + "&strFontColor=" + getParam('font-color', null) + "&strCurrId=" + getParam('currency', null);

        this.parseResult = function (data, strProgId, strCurrId, booShowOnlyCasino) {
            document.getElementById("progressiveTicker" + strProgId).innerHTML = cleanHTML(data);
            if ((document.getElementById("progressiveTicker" + strProgId).innerHTML.length > 0) && (booShowOnlyCasino == 'false')) {
                var scrollScript = document.createElement('script');
                scrollScript.id = "mgsProgressiveTickerScriptScroll";
                scrollScript.setAttribute("type", "text/javascript");
                scrollScript.src = ((window.location.protocol == 'https:') ? "https://" : "http://") + "www.tickerassist.co.uk/ProgressiveTickers/WebServiceProgressiveTickerScriptScroll.asmx/renderScript?form=json&strProgId=" + strProgId + "&strCurrId=" + strCurrId; document.getElementById("progressiveTicker" + strProgId).parentNode.insertBefore(scrollScript, document.getElementById("progressiveTicker" + strProgId).nextSibling);
            }
        };
    };
};

var mgsProgressiveTickerSharedFunctions = document.getElementById('mgsProgressiveTickerSharedFunctions');
if (mgsProgressiveTickerSharedFunctions === null) {
    var INSERTmgsProgressiveTickerSharedFunctions = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
    INSERTmgsProgressiveTickerSharedFunctions.id = "mgsProgressiveTickerSharedFunctions";
    INSERTmgsProgressiveTickerSharedFunctions.setAttribute("type", "text/javascript");
    INSERTmgsProgressiveTickerSharedFunctions.src = "/js/ticker-updater.js";
}

renderTicker.init(lowerQueryString);