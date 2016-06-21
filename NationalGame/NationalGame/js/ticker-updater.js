function insComma(data) {
    var count = 0;
    var i = 0;
    var tmpStr = "";
    var comma = ",";

    for (i = data.length - 1; i >= 0; i--) {
        if (count == 3) { tmpStr += comma; count = 1; }
        else { count++; }

        tmpStr += data.charAt(i);
    }

    return (tmpStr);
}


function num2currency(field, currencyCharCode) {
    if (typeof (currencyCharCode) == 'undefined') { currencyCharCode = '0'; }
    var tmp1 = "";
    var cents = "";
    var dollars = "";
    var dec = -1;
    var num, i, j; num = "" + (Math.round(field * 100) / 100);

    dec = num.indexOf(".");

    cents = ((dec > 0) ? num.substring(dec, num.length) : ".00");
    if (cents.length == 2) { cents += "0"; }

    dollars = "" + parseInt(num);
    if (dollars < 0) { dollars = "0"; cents = ".00"; }

    tmp1 = insComma(dollars);
    if (currencyCharCode !== '0') {
        if (currencyCharCode.indexOf("&") > 0) {
            num = ""; var currencyCodeSplit = currencyCharCode.split('&');
            for (j = 0; j < currencyCodeSplit.length; j++) {
                num = num + String.fromCharCode(parseInt(currencyCodeSplit[j]));
            }
        }
        else { num = String.fromCharCode(parseInt(currencyCharCode)); }
    }
    else { num = ""; }

    for (i = tmp1.length - 1; i >= 0; i--) { num += tmp1.charAt(i); }
    num += cents + "";

    return num;
}

function num2dollar(field) { return num2currency(field, '36'); }
function num2sterling(field) { return num2currency(field, '163'); }
function num2euro(field) { return num2currency(field, '8364'); }


function ScrollJackpotTotal(currencyCharCode) {
    var obj = document.getElementById("jackpotstotal");
    if (obj) {
        current_value += difference;
        obj.value = num2currency(current_value / 100, currencyCharCode);
    }

    window.setTimeout("ScrollJackpotTotal('" + currencyCharCode + "')", 1000);
}

if (!Array.indexOf) {
    Array.prototype.indexOf = function (obj) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == obj) { return i; }
        }
    };
}

function ScrollProgressiveCounters(prId, currencyCharCode) {
    if (typeof (Ticker) == 'undefined') {
        window.setTimeout("ScrollProgressiveCounters('" + prId + "', '" + currencyCharCode + "')", 100);
    }
    else {
        if (typeof (currencyCharCode) == 'undefined') { currencyCharCode = '0'; }
        var obj = document.getElementById('progressive' + prId);
        if (obj) {
            var tickerArrayId = Ticker.indexOf(prId);
            if (tickerArrayId >= 0) {
                tickerArrayId += 1;
                JP[tickerArrayId] += (Inc[tickerArrayId]);
                obj.value = num2currency(JP[tickerArrayId] / 100, currencyCharCode);
            }
            else {
                var objParent = document.getElementById('progressiveDiv' + prId);
                if (objParent) { objParent.style.display = 'none'; }
            }
        }
        window.setTimeout("ScrollProgressiveCounters('" + prId + "', '" + currencyCharCode + "')", 1000);
    }
}

document.onload = function () {
    var head = document.getElementsByTagName('head')[0];
    if (head !== null) {
        var headScriptNodes = head.getElementsByTagName('script');
        if (headScriptNodes !== null) {
            for (var i = headScriptNodes.length - 1; i >= 0; i--) {
                if (headScriptNodes[i].getAttribute('id') !== null) {
                    if (headScriptNodes[i].getAttribute('id') == "mgsProgressiveTickerAsmxScript") { head.removeChild(headScriptNodes[i]); }
                }
            }
        }
    }
};