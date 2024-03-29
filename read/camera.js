window.addEventListener("DOMContentLoaded", function() {
        // Grab elements, create settings, etc.
        var canvas = document.getElementById("canvas"),
                context = canvas.getContext("2d"),
                video = document.getElementById("video"),
                //videoObj = { "video": true },
                videoObj = {
  video: {
    mandatory: {
      minWidth: 640,
      minHeight: 480
    }
  }
};
                errBack = function(error) {
                        console.log("Video capture error: ", error.code); 
                };

        // Put video listeners into place
        if(navigator.getUserMedia) { // Standard
                navigator.getUserMedia(videoObj, function(stream) {
                        video.src = stream;
                        video.play();
                }, errBack);
        } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
                navigator.webkitGetUserMedia(videoObj, function(stream){
                        video.src = window.webkitURL.createObjectURL(stream);
                        video.play();
                }, errBack);
        }
        else if(navigator.mozGetUserMedia) { // Firefox-prefixed
                navigator.mozGetUserMedia(videoObj, function(stream){
                        video.src = window.URL.createObjectURL(stream);
                        video.play();
                }, errBack);
        }
}, false);
