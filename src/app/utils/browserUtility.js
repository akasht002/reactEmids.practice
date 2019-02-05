export const isIEBrowser = (navigator.userAgent.match(/Trident/g) || navigator.userAgent.match(/Edge/g));

export const isMobileBrowser = (navigator.userAgent.match(/Android/i)
|| navigator.userAgent.match(/webOS/i)
|| navigator.userAgent.match(/iPhone/i)
|| navigator.userAgent.match(/iPad/i)
|| navigator.userAgent.match(/iPod/i)
|| navigator.userAgent.match(/BlackBerry/i)
|| navigator.userAgent.match(/Windows Phone/i))

export const CHECK_DEVICE_MEDIA = (navigator.getUserMedia || // use the proper vendor prefix
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);
