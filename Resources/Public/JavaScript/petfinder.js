$(function() {
	// Bind callback to "Submit" button
	//$("button[name='tx_form_formframework[petFinder-260][__currentPage]']").on("click", getDogs);
	var adoptionForm = document.getElementById('petFinder-260');
	let offsetCnt = 50;
	adoptionForm.addEventListener('submit', function(e) {
		e.preventDefault();
		e.stopPropagation();
		adoptionForm.classList.add('was-validated');
		if (adoptionForm.checkValidity() === false) {
			console.log("adoptionForm:  invalid...");
			return;
		}
		getDogs(0);
	});
	
	// No comment...
	function getShelters (e) {
		if ($("#petFinder-260-text-1")[0].value.length > 0) {
			let locationStr = $("#petFinder-260-text-1")[0].value;
			$.petfinder.findShelters({location: locationStr}, (results) => {
				showShelters(results.shelters);
			});
		}
		e.preventDefault();
	}

	// No comment...
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

	// No comment...
	function getDogs (offset = 0) {
		let options = {
			offset: offset,
			location: $("#petFinder-260-text-1")[0].value,
			breed: $("#petFinder-260-singleselect-1 option:selected").text(),
			gender: $("#petFinder-260-singleselect-2").val()
		}
		$.petfinder.findDogs(options, (results) => {
			showDogs(offset, results);
		});
	}

	// No comment...
	function showDogs(offset, results) {
		if (results.status === 100) {
			let lastOffset = results.lastOffset.$t;
			let newOffset = offset + offsetCnt;
			let dogs = results.pets;
			console.log("showDogs:  ", newOffset, lastOffset);
			
			let dogGallery = '';
			for (let i = 0; i < dogs.length; i++) {
				//console.log(dogs[i]);
				dogGallery += '<div class="p-2 ttoys petfinder-card">' +
								'<div class="card">' +
								((dogs[i].media.photos) ? '<div class="card-img-top-container d-flex justify-content-center align-items-center">' +
								'<img data-src="' + dogs[i].media.photos.photo[2].$t + '" class="card-img-top lazy" id="' + dogs[i].id.$t + '"></div>' : '<div class="card-img-top-container d-flex justify-content-center align-items-center" id="' + dogs[i].id.$t + '"><i class="fas fa-question fa-5x" style="color:white; position:relative; top: 100px;"></i></div>') +
								'<div class="card-body">' +
								'<h6 class="card-title">' + ((dogs[i].sex.$t === 'M') ? '<i class="fas fa-mars fa-lg"></i>': '<i class="fas fa-venus fa-lg"></i>') + " " + dogs[i].name.$t + '</h6>'+
								'</div>' +
								'</div>' +
								'</div>' +
								'</div>';
			}
			if (lastOffset == newOffset) {
				dogGallery += '<div class="btn btn-primary align-self-center ml-auto mr-auto" id="findMorePets">Find More...</div>';
			}
			if (!offset) {
				$("#petFinderGallery").empty().append(dogGallery);
			} else {
				if ($('#findMorePets')) { $('#findMorePets').remove(); }
				$("#petFinderGallery").append(dogGallery);
			}
			for (let i = 0; i < dogs.length; i++) {
				if (1 || dogs[i].media.photos) {
					let petfinderUrl = "https://www.petfinder.com/dog/"
						+ petfinderUrlEncode(dogs[i].name.$t
						+ "-" + dogs[i].id.$t)
						+ "/" + dogs[i].contact.state.$t
						+ "/" + petfinderUrlEncode(dogs[i].contact.city.$t);
					$("#" + dogs[i].id.$t).on("click",
						{shelterId: dogs[i].shelterId.$t},
						(event) => {
							//console.log(dogs[i].shelterId.$t + "/" + event.data.shelterId + ":  " + petfinderUrl);
							$.petfinder.getShelter({shelterId: dogs[i].shelterId.$t}, (results) => {
								console.log("getShelter:  ", results, petfinderUrl);
								console.log(petfinderUrl + '/' + petfinderUrlEncode(results.shelter[0].name.$t + '-' + results.shelter[0].id.$t));
								window.open(petfinderUrl + '/' + petfinderUrlEncode(results.shelter[0].name.$t + '-' + results.shelter[0].id.$t));
								//var petfinderUrlComplete = 
							});
						}
					);
				}
			}
			if ($("#findMorePets")) {
				$("#findMorePets").on('click', (event) => { getDogs(newOffset); });
			}
			
			$('.lazy').lazy();
		} else {
			console.log("showDogs:  no results...");
			$("#petFinderGallery").empty().append('Sorry...no dogs were found in this area...');
		}
	}
	
	function petfinderUrlEncode(urlFrag) {
		return urlFrag.replace(
				/\*|&|\s+|\W+/gi, (x) => {
					switch(x) {
					case "*":
						return '-star-';
					case "&":
						return '-and-';
					default:
						return '-';
					}
				}
			).replace(/-+/gi, '-').replace(/^-|-$/gi, '').toLowerCase();
	}
	
	function convertStrToUrl (in_str) {
		var out_str = '';
	}
	
	function showBreeds(breeds) {
		var selectList = $('#petFinder-260-singleselect-1');
		var newList = '';
		for (var i = 0; i < breeds.length; i++) {
			newList += '<option value="' + breeds[i].$t + '">' + breeds[i].$t + '</option>';
		}
		selectList.empty();
		selectList.append(newList);
		$('#fa-dog-singleselect-1 svg').removeClass('fa-spin');
		$("#petFinder-260-singleselect-1").prop( "disabled", false );
	}
	
	$("#petFinder-260-singleselect-1").prop( "disabled", true );
	$('#fa-dog-singleselect-1 svg').addClass('fa-spin');
	$.petfinder.findBreeds((results) => { showBreeds(results.breeds); });
});