// JavaScript For the Index Page

// JavaScript for updating and managing the navigation throughout the lesson.

$(function() {
    
    $('#next-lesson-button').on('click', function(){
        var current = $('#navigation .current');
        var currentContent = $('#content-panel .current');
        var next = $(current).next();
        var nextContent = $(currentContent).next();
        
        // If we are at the last lesson point
        if(!next.next().prop('tagName')){
            // Switch the button to a handshake button.
            
            $('#next-lesson-button').hide();
            $('#handshake-button').show();
        }
        
        current.toggleClass('current');
        next.toggleClass('current'); 
        
        currentContent.toggleClass('current');
        nextContent.toggleClass('current');
        
    });
    
    $('#handshake-button').on('click', function(){
        $('.completion-container').show();
    });
    
    $('#return-to-board-button').on('click', function(){
        $('.completion-container').hide();
    });

    $('#video-1').on('click', function() {
        $('.video-capture-max').attr("src", "static/google-hangout-1.png");

        $('#video-1').addClass("video-border");
        $('#video-2').removeClass("video-border");
        $('#video-3').removeClass("video-border");

    });

    $('#video-2').on('click', function() {
        $('.video-capture-max').attr("src", "static/google-hangout-2.jpg");
        
        $('#video-2').addClass("video-border");
        $('#video-1').removeClass("video-border");
        $('#video-3').removeClass("video-border");
    });

     $('#video-3').on('click', function() {
        $('.video-capture-max').attr("src", "static/google-hangout-3.jpg");

        $('#video-3').addClass("video-border");
        $('#video-1').removeClass("video-border");
        $('#video-2').removeClass("video-border");
    });

    // Creating a Drawing Board
    var myBoard = new DrawingBoard.Board('board', {
        color: '#2f75b4',
    });

});