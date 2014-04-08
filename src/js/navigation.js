// JavaScript for updating and managing the navigation throughout the lesson.

$(function() {
    
    $('#next-lesson-button').on('click', function(){
        var current = $('#navigation .current');
        var next = $(current).next();
        
        // If we are at the last lesson point
        if(!next.next().prop('tagName')){
            // Switch the button to a handshake button.
            
            $('#next-lesson-button').hide();
            $('#handshake-button').show();
        }
        
        current.toggleClass('current');
        next.toggleClass('current'); 
        
    });
    
});