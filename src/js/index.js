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
    
    $('#navigation li .fa').on('click', function(){
        // If the parent container is already selected, we do not do anything
        if($(event.target).parent().parent().hasClass('current')){
            return;
        }
        else{
            var taskNum = $(event.target).parent().parent().index();
            goToTask(taskNum);
        }
    });
    
    $('#handshake-button').on('click', function(){
        $('.completion-container').show();
    });
    
    $('#return-to-board-button').on('click', function(){
        $('.completion-container').hide();
    });

    // Creating a Drawing Board
    var myBoard = new DrawingBoard.Board('board', {
        color: '#2f75b4',
    });

});

