// used to hold the interval timer that updates the focused video
var TIMER;
var IS_MUTED = false;
var IS_VIDEO_OFF = false;
var localStream;
var focusedStream;
var context;

$(function() {
    var webrtc = new SimpleWebRTC({
        // the id/element dom element that will hold "our" video
        localVideoEl: 'localStream',
        // the id/element dom element that will hold remote videos
        remoteVideosEl: 'thumbnails',
        // immediately ask for camera access
        autoRequestMedia: true
    }); 
    localStream = document.getElementById("localStream");
    focusedStream = document.getElementById("focusedStream");
    context = focusedStream.getContext('2d');
    TIMER = setInterval(function() {capture(localStream, true);}, 42);
    $(localStream).css('cursor', 'pointer');
    // when local video clicked toggle focus
    $(localStream).click(function() {
        clearInterval(TIMER);
        TIMER = setInterval(function() {capture(localStream, true);}, 42);
    });
    // when videos are added, set click listeners
    webrtc.on('videoAdded', function (video, peer) {
        $(video).attr('width', '100%');
        $(video).css('cursor', 'pointer');
        $(video).click(function() {
            clearInterval(TIMER);
            TIMER = setInterval(function() {capture(video, false);}, 42);
        });
    });
    // join the room on the signaling server
    webrtc.on('readyToCall', function () {
        var name = getRoomName('id');
        if (!name) {
            webrtc.joinRoom('teach2learn');
        } else {
            webrtc.joinRoom(name);
        }
    });
    $('.video').click(function (e) {
        var $target = $('.btn.video');
        if (IS_VIDEO_OFF) {
            webrtc.resumeVideo();
        } else {
            webrtc.pauseVideo();
        }
        IS_VIDEO_OFF = !IS_VIDEO_OFF;
        var cls = getStateIcon('video', IS_VIDEO_OFF);
        $target.empty();
        $target.append('<i class="fa ' + cls + ' video"></i>');
    });
    $('.mute').click(function (e) {
        var $target = $('.btn.mute');
        if (IS_MUTED) {
            webrtc.unmute();
        } else {
            webrtc.mute();
        }
        IS_MUTED = !IS_MUTED;
        var cls = getStateIcon('mute', IS_MUTED);
        $target.empty();
        $target.append('<i class="fa ' + cls + ' mute"></i>');
    });
});

/*
 * Helper function for getting the appropriate icon for webcam control hovers
 */
function getStateIcon(feature, state) {
    if (feature == 'video') {
        if (state) { // is video off?
            return 'fa-eye';
        } else {
            return 'fa-eye-slash';
        }
    } else if (feature == 'mute') {
        if (state) { // is currently muted?
            return 'fa-microphone';
        } else {
            return 'fa-microphone-slash';
        }
    }
}

/*
 * Function that updates a cavnas with a still frame of the video
 */
function capture(video, mirror) {
     var video_w = video.videoWidth;
     var video_h = video.videoHeight;
     var ratio = video_w / video_h;
     var parent_h = $(focusedStream).parent().height();
     var parent_w = $(focusedStream).parent().width();
     // Determine if height or width is the constraining dimension
     if (parseInt(parent_h * ratio) > parent_w) {
         var canvas_w = parent_w;
         var canvas_h = parseInt(canvas_w / ratio);
     } else {
         var canvas_h = parent_h;
         var canvas_w = parseInt(canvas_h * ratio);
     }
     // update canvas size
     $(focusedStream).attr('height', canvas_h);
     $(focusedStream).attr('width', canvas_w);
     context.fillRect(0, 0, canvas_w, canvas_h);
     if (mirror) {
         context.save();
         context.scale(-1, 1) ;
         context.translate(-canvas_w,0);
     }
     context.drawImage(video, 0, 0, canvas_w, canvas_h);
     if (mirror) {
         context.restore();
     }
}
/*
 * Function for reading the chat room id off the URL
 * http://www.jquery4u.com/snippets/url-parameters-jquery/
 */
getRoomName = function(param){
    var results = new RegExp('[\\?&amp;]' + param + '=([^&amp;#]*)').exec(window.location.href);
    if (results == null) {
        return 0;
    } else {
        return results[1] || 0;
    }
}
