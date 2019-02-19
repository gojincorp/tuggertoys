$(function() {
	$('.lazy').Lazy();
	
	var $mainnav = $("#mainnavigation");
	var $breadcrumb = $(".ttoys-breadcrumb");
	
	// VIEWPORT RESIZE CALLBACK
	// ========================
	var resizeCallback = function () {
		//console.log("resizeCallback:  " + $(".device-xs").is(":visible") + $(".device-sm").is(":visible") + $(".device-md").is(":visible") + $(".device-lg").is(":visible") + $("#mainnavigation").is(":visible"));
		if ($mainnav.is(":visible")) {
			//$breadcrumb.addClass('lower-top');
		} else {
			//$breadcrumb.removeClass('lower-top');
		}
	};
	resizeCallback();	
	$(window).resize(function() {
		resizeCallback();
	});

	var $videoSrc;  
	$('.video-btn').click(function() {
	    $videoSrc = $(this).data( "src" );
	});
	console.log($videoSrc);

	  
	  
	// when the modal is opened autoplay it  
	$('#myModal').on('shown.bs.modal', function (e) {
	    
	// set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
	$("#video").attr('src',$videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1" ); 
	})
	  
	  
	// stop playing the youtube video when I close the modal
	$('#myModal').on('hide.bs.modal', function (e) {
	    // a poor man's stop video
	    $("#video").attr('src',$videoSrc); 
	}) 
});