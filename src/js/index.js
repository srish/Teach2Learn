// JavaScript For the Index Page

// JavaScript for updating and managing the navigation throughout the lesson.

$(function() {
    
    // Scrolling the navigation bar to a certain task
    function scrollTo(taskNum){
        $('#navigation').animate({
          scrollLeft: 220*(taskNum - 1)
        }, 250);
    }
    
    // Shifting to a certain task point
    function goToTask(taskNum){
        var current = $('#navigation .current');
        var currentContent = $('#content-panel .current');
        
        var next = $($('#navigation li').get(taskNum - 1));
        var nextContent = $($('#content-panel .lesson').get(taskNum - 1));
        
        console.log(nextContent);
        
        // If we are going to the last lesson point
        if(!next.next().prop('tagName')){
            // Switch the button to a handshake button.
            $('#next-lesson-button').hide();
            $('#handshake-button').show();
        }
        
        // If we are going from the last point to a previous point...
        if(!current.next().prop('tagName')){
            // Switch the button to a handshake button.
            $('#handshake-button').hide();
            $('#next-lesson-button').show();
        }
        
        current.toggleClass('current');
        next.toggleClass('current'); 
        
        currentContent.toggleClass('current');
        nextContent.toggleClass('current');
    }
    
    // Advancing to the next lesson point
    $('#next-lesson-button').on('click', function(){
        
        var nextTaskNum = $('#navigation li.current').index() + 1
        
        goToTask(nextTaskNum);
        
        // Lastly, scroll the navigation so that the point stays in view of the user.
        
        scrollTo(nextTaskNum);
    });
    
    // Going to a specific lesson point
    $('#navigation li:not(".current") .fa').on('click', function(event){
        console.log($(event.target).parent().parent().index());
        
        var taskNum = $(event.target).parent().parent().index();
        goToTask(taskNum);
    });
    
    $('#handshake-button').on('click', function(){
        $('.completion-container').show();
    });
    
    $('#return-to-board-button').on('click', function(){
        $('.completion-container').hide();
    });
  
    // Making the webcam feeds dynamic

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

