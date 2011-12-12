
function init() {
	$("#info").hide();
    console.log(sp.core.player);
	   updatePageWithTrackDetails();

	    sp.trackPlayer.addEventListener("playerStateChanged", function (event) {
		
	        // Only update the page if the track changed
	        if (event.data.curtrack && event.data.curtrack == true) {
	            updatePageWithTrackDetails();
	        } else {$("#bg").fadeOut(); clearTi}
	   });
}

var nextTimeOut = 0;

	function updatePageWithTrackDetails() {
		clearTimeout(nextTimeOut);
	 
	    var playerTrackInfo = sp.trackPlayer.getNowPlayingTrack();			
	  
	  if (playerTrackInfo == null) {
		    console.log("Nothing playing!")
	    } else {
	        var track = playerTrackInfo.track;
			console.log("ARTIST:" + track.album.artist.name);
			loadImages(track.album.artist.name);
	        $("#info").text(track.name + " - " + track.album.artist.name );
	  		$("#info").fadeIn();
			$("#info").delay(2000).fadeOut();
			$("#bg").fadeOut();
	//attr("innerText",track.name + " by " + track.album.artist.name + ".");
	    }
	}



function loadImages(tags) {
	console.log("LOAD " + tags);
	
	$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
		lang : 'en-us',
		tags : tags,
		tagmode : 'all',
		limit : '20',
		format : 'json'
	}, function(data) {
		
		images = new Array();
		$.each(data.items, function(i, item) {
			if(i == 20)
				return false;
			
			var imgLarge = item.media.m.split('m.jpg')[0] + 'b.jpg';
			images.push(imgLarge);
			
			
		});
		
		
		showNext()
	});
}

var images = [];
var count = 0;
function showNext() {
	bg = $("#bg");
	bg.attr("src", images[count % images.length]);
	$("#preload").attr("src", images[ (count+1) % images.length]);

	
	bg.fadeIn(700);
	count++;
	
	nextTimeOut = setTimeout(hide, 7000);
}

function hide() {

	bg.fadeOut(700, showNext);

}


$(window).load(function() {

	var theWindow = $(window), $bg = $("#bg"), aspectRatio = $bg.width() / $bg.height();

	function resizeBg() {

		if((theWindow.width() / theWindow.height()) < aspectRatio) {
			$bg.removeClass().addClass('bgheight');
		} else {
			$bg.removeClass().addClass('bgwidth');
		}

	}


	theWindow.resize(function() {
		resizeBg();
	}).trigger("resize");


});