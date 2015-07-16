var powered = $("#waves");

function run() {
	powered.animate({opacity:'1'}, 1000);
	powered.animate({opacity:'0'}, 1000, run);
}

run();


var getInfo = function() {

	var artist = $("#searchbox").val();

	console.log(artist);

	if (artist === " ") {
		$("submit").css("background-color", "red");
		$("searchbox").attr("placeholder", "You forgot the artist name!");
	} else {

		$.getJSON("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=656b4c7f71493c2eeed8f92982459585&format=json", function(data) {
			var artistname = data.artist.name;
			var artistbio = data.artist.bio.summary;
			var artistphoto = data.artist.image[4]["#text"];

			for (var i = 0; i > artistbio.length; i++) {
				if (artistbio.slice(i, i + 15) === "Read more about") {
					artistbio = artistbio.slice(0, 5);
				}
			}

			var end = artistbio.indexOf("Read more about");

			artistbio = artistbio.slice(0, end);

			$(".bio > h2").text(artistname);
			$(".bio > p").html(artistbio);
			$(".photo > img").attr("src", artistphoto);
			$(".photo > img").attr("alt", artistname);
		});


		$("#powered").fadeOut("slow");
		$("#results").fadeIn("slow");

	}
};


 $('#submit').click(getInfo);

 $('#searchbox').keyup(function(event){
    if(event.keyCode == 13){
        getInfo();
    }
 });








