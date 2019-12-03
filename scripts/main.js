// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed

$(document).ready(function() {
  AOS.init( {
    // uncomment below for on-scroll animations to played only once
    // once: true  
  }); // initialize animate on scroll library
});

// Smooth scroll for links with hashes
$('a.smooth-scroll')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});

$('#buttonSendEmail').click(function(event){
	var fromName = $('#fromName').val();
	var fromSubject = $('#fromSubject').val();
	var fromEmail = escape($('#fromEmail').val());
	var emailMessage = $('#emailMessage').val();
	
	var APIURLToCall = 'https://api.elasticemail.com/v2/email/send?apikey=8f518f58-2195-44f8-9eb5-8eccf661cec7&to=rajesh64727%40gmail.com&subject='+fromSubject+'&from='+fromEmail+'&fromName='+fromName+'&bodyText='+fromEmail+'<br>'+fromName+'<br>'+emailMessage;

	$.post(APIURLToCall, {}, function(data, status){
		alert('Data '+data+'\n Status '+ status);
	});
});
