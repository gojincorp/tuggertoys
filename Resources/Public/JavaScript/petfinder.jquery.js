(function($) {
	// Custom jQuery module for petfinder API
	$.petfinder = {
		findShelters: function(options, cb) {
			var req = $.ajax({
				"url": "http://www.ideasbeyond.com:7071/?action=findShelters&location=" + options.location + "&callback=?",
				"type": "get",
				"dataType": "jsonp"
			});

			console.log("petfinder.jquery.js: " + cb);
			req.done(cb);
		},
		findDogs: function(options, cb) {
			var req = $.ajax({
				"url": "http://www.ideasbeyond.com:7071/?action=findDogs" + "&offset=" + options.offset + "&location=" + options.location + "&animal=dog" + "&breed=" + options.breed + "&gender=" + options.gender + "&callback=?",
				"type": "get",
				"dataType": "jsonp"
			});

			console.log("petfinder.jquery.js: ", options);
			req.done(cb);
		},
		findBreeds: function(cb) {
			var req = $.ajax({
				"url": "http://www.ideasbeyond.com:7071/?action=findBreeds&callback=?",
				"type": "get",
				"dataType": "jsonp"
			});
			
			console.log("petfinder.jquery.js: " + cb);
			req.done(cb);
		},
		getShelter: function(options, cb) {
			var req = $.ajax({
				"url": "http://www.ideasbeyond.com:7071/?action=getShelter&shelterId=" + options.shelterId + "&callback=?",
				"type": "get",
				"dataType": "jsonp"
			});

			console.log("petfinder.jquery.js: " + cb);
			req.done(cb);
		}
	};
})(jQuery);