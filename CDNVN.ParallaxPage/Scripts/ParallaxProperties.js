
function ParallaxProperties(popupUrl) {
    this.PopupUrl = popupUrl == undefined ? "/home/parallaxproperties" : popupUrl;
    this.Background = ["background-color", "background-image", "background-repeat", "background-attachment", "background-position", "background-origin"];
    this.Border = ["border-style", "border-width", "border-color", "border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius"];
    this.General = ["box-shadow", "padding"];
}

ParallaxProperties.prototype.SetUrl = function (url) {
    this.PopupUrl = url;
};
ParallaxProperties.prototype.Get = function (elm) {


    var css = {};
    for (x in this.Background) {
        css[this.Background[x]] = $(elm).css(this.Background[x]);
    }
    for (x in this.Border) {
        css[this.Border[x]] = $(elm).css(this.Border[x]);
    }
    for (x in this.General) {
        css[this.General[x]] = $(elm).css(this.General[x]);
    }
    return css;
};
ParallaxProperties.prototype.Set = function (elm, css) {
    $(elm).css(css);
};
ParallaxProperties.prototype.OpenPopup = function (elm) {
    if ($(elm).attr("id") == undefined) {
        alert("Vui lòng tạo/chọn slide");
        return false;
    };

    var css = this.Get(elm);
    var height = 525;
    var width = 315;
    var top = screenTop + window.outerHeight - window.innerHeight - 8 + 50;
    var left = screenLeft + window.innerWidth - width - 8;
    //if(screenTop==0&&screenLeft)
    if (screenTop == 0 && screenLeft == 0) {
        top += 8;
        left -= 8;
    }
    var propertiesWindow = window.open(this.PopupUrl + "?element=" + elm, "Properties", "top=" + top + ", left=" + left + ", width=" + width + ", height=" + height + "'location=no,toolbar=no,menubar=no,resizable=no");
    propertiesWindow.dataCSS = css;
    return false;
};