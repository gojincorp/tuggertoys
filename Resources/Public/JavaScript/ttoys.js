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
	//console.log($videoSrc);

	  
	  
	// when the modal is opened autoplay it  
	$('#myModal').on('shown.bs.modal', function (e) {
	    
	// set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
	$("#video").attr('src',$videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1" ); 
	});
	  
	  
	// stop playing the youtube video when I close the modal
	$('#myModal').on('hide.bs.modal', function (e) {
	    // a poor man's stop video
	    $("#video").attr('src',$videoSrc); 
	});
	
	//$(".modal").on("shown.bs.modal", function() {console.log($("#slick-id318-main").length);$("#slick-id318-nav .slick-next").trigger("click.slick");$("#slick-id318-nav .slick-prev").trigger("click.slick");});
	$(".modal").on("shown.bs.modal", function() {$(window).trigger("resize");console.log("Window resizing...");});
	//$(".modal").on("show.bs.modal", function() {$(".foobarClass2 .slick-container").toggle();});
	//$(window).on("load.slick.slick-id318", ()=>{window.alert("load.slick.slick-id318");});
	//$(window).on("resize.slick.slick-id318", ()=>{window.alert("resize.slick.slick-id318");});
	
	
	/*
	var petFinder = $.ajax({
		"url": "http://api.petfinder.com/shelter.find?format=json&key=5aecd2abf90929bd01aad4e46282f529&location=95124&callback=?",
		"type": "get",
		"dataType": "jsonp"
	});
	
	petFinder.done(function(data) {
		console.log(data);
	});
	*/
	
	$.petfinder = {
		findShelters: function(options, cb) {
			var req = $.ajax({
				"url": "http://www.ideasbeyond.com:7071/?action=findShelters&location=" + options.location + "&callback=?",
				"type": "get",
				"dataType": "jsonp"
			});
			
			req.done(cb);
		},
		findDogs: function(options, cb) {
			var req = $.ajax({
				"url": "http://www.ideasbeyond.com:7071/?action=findDogs&location=" + options.location + "&animal=dog&breed=" + options.breed + "&callback=?",
				"type": "get",
				"dataType": "jsonp"
			});
			
			req.done(cb);
		},
		findBreeds: function(cb) {
			var req = $.ajax({
				"url": "http://www.ideasbeyond.com:7071/?action=findBreeds&callback=?",
				"type": "get",
				"dataType": "jsonp"
			});
			
			req.done(cb);
		}
	}
	
	/*
	 * ADOPTION FORM CODE
	 * ******************/
	var adoptionForm = document.getElementById('petFinder-260');
	adoptionForm.addEventListener('submit', function(e) {
		e.preventDefault();
		e.stopPropagation();
		if (adoptionForm.checkValidity() === false) {
			console.log("adoptionForm:  invalid...");
		} else {
			console.log("adoptionForm:  valid...");
		}
		adoptionForm.classList.add('was-validated');
	});
	

	/*
	 * ADOPTION FORM:  bind callback to "Submit" button
	 */
	//$("button[name='tx_form_formframework[petFinder-260][__currentPage]']").on("click", getDogs);
	
	function getShelters (e) {
		if ($("#petFinder-260-text-1")[0].value.length > 0) {
			let locationStr = $("#petFinder-260-text-1")[0].value;
			$.petfinder.findShelters({location: locationStr}, (results) => {
				showShelters(results.shelters);
			});
		}
		e.preventDefault();
	}
	
	function showShelters(shelters) {
		console.log(shelters);
		let shelterList = $("<tbody />");
		for (let i = 0; i < shelters.length; i++) {
			shelterList.append('<tr><td>'
				+ shelters[i].name.$t + '</td><td>'
				+ '<td>Available Pets</td><td>'
				+ shelters[i].city.$t + ', ' + shelters[i].state.$t + '</td><td>'
				+ shelters[i].phone.$t + '</td></tr>'					
			);
		}
		
		shelterList = shelterList.children('tr').unwrap();
		$("#shelters").empty().append(shelterList);
	}

	/*
	 * ADOPTION FORM:  onClick "Submit" callback
	 */
	function getDogs (e) {
		if ($("#petFinder-260-text-1")[0].value.length > 0) {
			let locationStr = $("#petFinder-260-text-1")[0].value;
			let breedStr = $("#petFinder-260-singleselect-1 option:selected").text();
			$.petfinder.findDogs({location: locationStr, breed: breedStr}, (results) => {
				showDogs(results.pets);
			});
		}
		e.preventDefault();
	}

	/*
	 * Build petfinder gallery from AJAX results
	 */
	function showDogs(dogs) {
		console.log(dogs);
		let dogList = $("<tbody />");
		for (let i = 0; i < dogs.length; i++) {
			dogList.append('<tr><td>'
				+ dogs[i].name.$t + '</td><td>'
				+ dogs[i].sex.$t + '</td><td>'
				+ ((dogs[i].breeds.breed[0]) ? dogs[i].breeds.breed[0].$t : dogs[i].breeds.breed.$t) + '</td><td>'
				+ dogs[i].description.$t + '</td></tr>'					
			);
		}
		
		dogList = dogList.children('tr').unwrap();
		$("#shelters").append(dogList);
	}
	
	
	function showBreeds(breeds) {
		var selectList = $('#petFinder-260-singleselect-1');
		var newList = '';
		for (var i = 0; i < breeds.length; i++) {
			newList += '<option value="' + breeds[i].$t + '">' + breeds[i].$t + '</option>';
		}
		selectList.empty();
		selectList.append(newList);
	}
	
	$.petfinder.findBreeds((results) => { showBreeds(results.breeds); });
});