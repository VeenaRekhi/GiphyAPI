
//  $('.gifRow').slick({
//	centerMode: true,
//  	adaptiveHeight: true,
//  	responsive: [
//    {
//    	breakpoint: 768,
//      	settings: {
//        arrows: false,
 //       centerMode: true,
 //       centerPadding: '40px',
//      }
//    },
//    {
//      	breakpoint: 480,
//      	settings: {
//        arrows: false,
//        centerMode: true,
//        centerPadding: '40px',
//      }
//    }
//  ]
//  });


// Declare and set all the varaiables,
// Declare a variable "topics" which contains an ,
// inline array of topics.

    var buttonList;
	var topics = [ "Giraf", "Horse", "Monkey", "Dolphin", "Charlie Chaplin",
	               "Tom And Jerry", "Violin", "Piano", "Mickey Mouse", "Lorel Hardy"];
	var originalTopicsLength = topics.length; // Variable used for "Clear" bitton.
	var newButtonsAdded = 0; // To determine position in the array where mnually added buttons start!!
	var buttonId = ""; // Variable used to add button.
	var image;
	var gif;
	var gifPictures;
	var currentPicture = 0; // current picture/ gif in the carousel.


// "this" means object "topics" will always refer to the topics array!
//for "this", we will create a set of variables to pass through functions.
  
//Create buttons for default topics.

	for (i = 0; i < topics.length; i++ )
	{
		addButton(i);
	} 
//	  $('.slick-slide').show();

//Function to create buttons 

function addButton(i) {
	buttonId = $("<button>").text(topics[i])
    buttonId.attr("class", "btn-danger");
    buttonId.attr("name", topics[i]);
	$("#buttons-go-here").append(buttonId);
}

// Function to capture the click event of new button and call the create button function.

$("#newButton").on("click", function() {
	topics[topics.length] = document.getElementById("addition").value;
	var c = topics.length - 1;
	newButtonsAdded++;
	addButton(c);
});

// Functions to run the game starts here...
// When the user presses a key, it will run the following function...
// Function to add still images of gifs by calling in API.

$(document.body).on("click", ".btn-danger", function() {
	var buttonPressed = this.getAttribute("name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	       buttonPressed + "&api_key=dc6zaTOxFJmzC&limit=10";

//  Using method "get" the ajax function to get asynchronised response/giphy api.

     $.ajax({
        url: queryURL,
        method: "GET",    
              
     }).done(function(response) {  // Function "done" will help to callback/Load data from 
      	gifPictures = response.data; // a server using an AJAX HTTP GET request

// For every gif in API append to animated-pics element

      	for (var i = 0; i < gifPictures.length; i++){
      		var gifDiv = $("<div class='picsRow' 'img-responsive' 'col-md-3 col-md-offset-2 text-center'>");
     		gifDiv.attr("style", "float:left;");

      		var rating = gifPictures[i].rating; //Add rating returned from the API
     		var h4 = $("<h4>").text("RATING: " + rating);
//     		h5.attr("style", "float:left;");
      	    
      	    image = gifPictures[i].images.fixed_width_small_still.url; // Add still image returned from the API
      	    gif = gifPictures[i].images.fixed_width_small.url; // Add animated url from the API
      	    var gifImage = $("<img>");
      	    gifImage.attr("src", image); //Show still image on the page when it loads for the first time
      	    gifImage.attr("class", "animate");
      	    gifImage.attr("animatedURL", gif); //Store animated URL in the data attribute "animatedURL"
      	    gifImage.attr("stillURL", image); //Store still URL in the data attribute "stillURL"
      	    gifImage.attr("state", "still"); //Since the default image shown in still, set data attribute "state" as "still"
//     		gifImage.attr("hspace", "20px");

            
            gifDiv.append(gifImage);
      	    gifDiv.append(h4);      	

           $("#animated-pics").prepend(gifDiv);
//			$(".gifRow").slick("slickAdd","<div></div>");
            }
            slideShow();
//            var timer = setInterval(slideShow, 5000);

    });
  });
// 
function slideShow() {
		currentPicture = gifPictures.length;//Variable currentPicture will hold no. of gifs coming from API.
		for (var n = 1; n < 11; n++ ) { // "n" will be the index passing through for loop to get the gif 
           currentPicture--;
      	    currentGif = gifPictures[currentPicture].images.fixed_width_small.url; // Add animated url from the API
//      		var slideDiv = $("<div class='slideDiv' 'img-responsive' 'col-md-3 col-md-offset-2 text-center'>");
//      	    slideDiv.attr("style", "animation-name: moveRight; animation-duration: 5s;");
//            var slideImage = $("<img>");
//      	    slideImage.attr("src", currentGif); //Show still image on the page when it loads for the first time
//      		document.getElementById("slidingGifs").innerHTML = ""; // remove all the images
//            slideDiv.append(slideImage);

//           $("#slidingGifs").prepend(slideDiv); //append the gif to the page
           $("#cr" + n).attr("src", currentGif); // Refering to the 10 elements (gifs) from the carousel in HTML.
           if (currentPicture == 0) {
           		currentPicture = gifPictures.length;
           }
        }
}



// Function to convert the images from still to animated and vice versa
     $(document.body).on("click", ".animate", function() {
      if ($(this).attr("state") === "still")  {
         $(this).attr("src", $(this).attr("animatedURL"));
         $(this).attr("state", "animated");
      }
      else  {
      	 $(this).attr("src", $(this).attr("stillURL"));
         $(this).attr("state", "still");
      }

    });

// Function to reset the page using "splice" remove all the newly added buttons from the topics array.
      $("#clearButton").on("click", function() {
      	document.getElementById("animated-pics").innerHTML = ""; // remove all the images
		topics.splice(originalTopicsLength, newButtonsAdded); //Splice the array to restore to default state     
      	document.getElementById("buttons-go-here").innerHTML = ""; // remove all the buttons
	    newButtonsAdded = 0; // reset the buttons manually added
		for (i = 0; i < topics.length; i++ ) // Add default buttons again
		{
			addButton(i);
			cri = i + 1;
			$("#cr" + cri).attr("src", "");
		} 


      });





