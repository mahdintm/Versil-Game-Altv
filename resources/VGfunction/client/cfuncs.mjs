import * as alt from "alt";

//For Client
alt.on('closeWebView', (webview) => {
    webview.destroy();
});