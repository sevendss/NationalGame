var scripts = document.getElementsByTagName('script');
var currentScript = scripts[scripts.length - 1];
currentScript.id = ((currentScript.id.length === 0) ? "mgsProgressiveTickerArrayScript" : currentScript.id);
if (typeof (Ticker) == 'undefined') {
    if (navigator.appName == "Microsoft Internet Explorer") {
        var srcLink = ((window.location.protocol == 'https:') ? "https://" : "http://") + "www.tickerassist.co.uk/ProgressiveTickers/WebServiceProgressiveTickerScriptAll.asmx/renderScript?form=json&strCurrId=null";
        document.write("<script id='mgsProgressiveTickerArray' type='text/javascript' src='" + srcLink + "'></script>");
    }
    else {
        var newScript = document.createElement('script');
        newScript.id = "mgsProgressiveTickerArray";
        newScript.setAttribute("type", "text/javascript");
        newScript.src = ((window.location.protocol == 'https:') ? "https://" : "http://") + "www.tickerassist.co.uk/ProgressiveTickers/WebServiceProgressiveTickerScriptAll.asmx/renderScript?form=json&strCurrId=null";
        document.getElementById(currentScript.id).parentNode.insertBefore(newScript, document.getElementById(currentScript.id).nextSibling);
    }
}