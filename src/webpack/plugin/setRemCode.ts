const setRemScript = `
(function () {
    var docEl = document.documentElement;
    var timer = null;
    var prevWidth = 0;
    var caculateSize = (width) => {
        var clientWidth = docEl.clientWidth;

        clearTimeout(timer);
        if (!clientWidth || prevWidth !== 0 && self.frameElement && self.frameElement.tagName === 'IFRAME') {
            timer = setTimeout(caculateSize, 100);
            return;
        }
        if (width === prevWidth) {
            return;
        }

        var BASE_FONT_SIZE = 100;
        docEl.style.fontSize = BASE_FONT_SIZE * (clientWidth / width) + 'px';
        prevWidth = clientWidth;
    }


    var observeWidth = function (standardWidth) {
        caculateSize(standardWidth);
        if (document.addEventListener) {
            var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
            window.addEventListener(resizeEvt, caculateSize.bind(null, standardWidth), false);
            document.addEventListener('DOMContentLoaded', caculateSize.bind(null, standardWidth), false);
        } else {
            window.onload = function () {
                caculateSize(standardWidth);
            };
            window.onresize = window.onload;
        }
    }
    observeWidth(750);
})()
`

export default setRemScript;