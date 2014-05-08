// Array of documents that appear in the bookshelf
MANIFEST = [
{
    'id': 0,
    'title': 'Design Thinking',
    'filename': 'design-thinking.jpg',
    'extension': 'jpg',
    'type': 'image',
},
{
    'id': 1,
    'title': 'Design Thinking Curriculum Lesson 1',
    'filename': 'Design Thinking Curriculum_Frechette_LESSON 1.pptx',
    'extension': 'pptx',
    'type': 'slides',
},
{
    'id': 2,
    'title': 'Art of Innovation Brainstorm',
    'filename': 'ArtOfInnovation_Brainstorm.pdf',
    'extension': 'pdf',
    'type': 'doc',
},
{
    'id': 3,
    'title': 'Tim Brown Design Thinking',
    'filename': 'Tim_Brown_Design_Thinking.pdf',
    'extension': 'pdf',
    'type': 'doc',
},
];

// Setup search index
var index = lunr(function () {
    this.field('title', {boost: 10});
    this.field('filename', {boost: 5});
    this.field('body');
    this.field('extension');
    this.ref('id');
})

// Index each document
for (var i = 0; i < MANIFEST.length; i++) {
    var file = MANIFEST[i];
    var body = $('#doc' + file.id);
    if (body.length) {
        body = body.text();
    } else {
        body = '';
    }
    index.add({
        'id': file.id,
        'title': file.title,
        'filename': file.filename,
        'extension': file.extension,
        'body': body
    });
}

/**
 * (Re)draw the list of documents
 */
function drawDocuments(docs, search_result) {
    var $table = $('#bookshelf_table');
    // Clear table
    $table.empty();
    for (var i = 0; i < docs.length; i++) {
        var file = MANIFEST[docs[i]];
        // Build and append file icon column
        var icon_class;
        if (file.type == 'image') {
            icon_class = 'fa fa-picture-o';
        } else if (file.type == 'slides') {
            icon_class = 'fa fa-list-alt';
        } else {
            icon_class = 'fa fa-file-text-o';
        }
        // Append row to table
        var $row = $('<tr/>').appendTo($table);
        var $first_col = $('<td/>').addClass('icon_col').html('<i class="' + icon_class + '"></i>').appendTo($row);
        // Build and append filename column
        var display_title = '<a target="_blank" href="static/' + file.filename + '">' + file.filename + '</a>';
        // If we are displaying search results show match indicator
        if (search_result) {
            display_title += ' <span class="bookshelf_match">matches</span>';
        }
        var $second_col = $('<td/>').html(display_title).appendTo($row);
    }
    if (search_result && !docs.length) {
        $table.append('<tr><td class="icon_col"></td><td>No matches found</td></tr>');
    }
}

// Draw all documents initially
drawDocuments([0, 1, 2, 3], false);

// Setup search listener
$('#bookshelf_search').typing({
    delay: 100,
    stop: function () {
        var query = $('#bookshelf_search').val();
        if (query == '') {
            drawDocuments([0, 1, 2, 3], false);
        } else {
            var results = index.search($('#bookshelf_search').val());
            console.log(results);
            var doc_array = [];
            for (var i = 0; i < results.length; i++) {
                doc_array.push(parseInt(results[i].ref));
            }
            drawDocuments(doc_array, true)
        }
    }
});

// Logic for the display and hiding of the bookshelf
$(function (){

    $('#bookshelf-toggle').on('click', function(){
        $('.bookshelf-row').slideToggle();
        $('#bookshelf-button-wrapper .down').toggle();
        $('#bookshelf-button-wrapper .up').toggle();
    });



});

