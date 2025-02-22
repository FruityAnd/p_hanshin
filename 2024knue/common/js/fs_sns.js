function openFacebook(){
    var _url = encodeURIComponent(window.location.href);
    openWin2('http://www.facebook.com/sharer/sharer.php?u=' + _url, '', 1000, 800, 0, 0, 1, 1, 0, 0, 0, (screen.width/2), (screen.height/2), 1);
}

function openTwitter(txt){
    var _txt = encodeURIComponent(txt);
    var _url = encodeURIComponent(window.location.href);
    openWin2('https://twitter.com/intent/tweet?text='+_txt+'&url='+_url, '', 1000, 800, 0, 0, 1, 1, 0, 0, 0, (screen.width/2), (screen.height/2), 1);
}

function openWin2(url, winname, width, height, tbar, mbar, sbar, loc, status, resizable, fscreen, left, top, cflag) {
    if(cflag == 'yes' || cflag == 'y' || cflag == '1') {
        left = (window.screen.width - width ) / 2;
        top  = (window.screen.height- height) / 2;
    }

    opening_window = window.open(url, winname, 'width=' + width + ', height=' + height + ', toolbar=' + tbar + ', menubar=' + mbar + ', scrollbars=' + sbar + ', location=' + loc + ', status=' + status + ', resizable=' + resizable + ', fullscreen=' + fscreen + ', left=' + left + ', top=' + top);
    opening_window.focus();
}
