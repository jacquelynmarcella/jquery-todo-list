document.addEventListener('DOMContentLoaded', function() {

	$("#item-input").focus(); // focuses on text field when page loads

	var resetForm = function() {
		$('form').trigger('reset');
		$("#item-input").focus(); // puts text field back in focus
	}

	// After user clicks "add" 
	$('#add-item').click(function() {
		var newItem = $('#item-input').val();	// pulls value from form
		// The below line pulls in a trashcan icon from font awesome for deleting
		var deleteBox = '<div class="deletebox"><i class="fa fa-trash" aria-hidden="true"></i></div>';

		$('#list-section').append('<li><span>' + newItem + deleteBox + '</span></li>');

		resetForm();

		$( function() {
    		$('#list-section').sortable();	// Makes items draggable/sortable
    		$('#list-section').disableSelection();
  		});
  		$('#clear-list').addClass('list-started');	// Makes clear list button visible
	});

	// Runs the same add item function from above but when "enter" is pressed
	$('#item-input').keypress(function(e){
        if(e.which === 13){ //Enter key pressed
        	e.preventDefault();
            $('#add-item').click();
        }
    });

	// User can also manually reset form
    $('#reset-form').click(function() {
		resetForm();
	});

    // When each new li is added, this adds event listener for class toggling
	$('ul').delegate('li', 'click', function() {
		$(this).toggleClass('complete');
	});

	// When each new li is added, also adds listener for the delete box
	$('ul').delegate('div.deletebox', 'click', function(e) {
		e.stopPropagation();
		$(this).closest('li').remove();
	});

	// When this is pressed, clears everything on the list
	$('#clear-list').click(function() {
		$('#list-section').empty();
		$(this).removeClass('list-started'); // Hides delete button until items added
		$("#item-input").focus(); // focuses back on text field
	});

});
