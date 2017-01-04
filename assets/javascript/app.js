var scream = document.createElement('audio');
	       scream.setAttribute('src', "assets/images/scream.mp3");

var laugh = document.createElement('audio');
	       laugh.setAttribute('src', "assets/images/evillaugh.mp3");

var music = document.createElement('audio');
	       music.setAttribute('src', "assets/images/pornmusic.mp3");

$(document).ready(function(){
	music.play();
	music.addEventListener('ended', function() {
   		this.currentTime = 0;
    	this.play();
		}, false);

function lindagone(){
	$("body").css("background-image","");
	$("#screen").css("display","block");
};

function lindaflash(){
	$("body").css("background-image","url(assets/images/linda.jpg");
	$("body").css("background-size","100% 100%");
	scream.play();
	setTimeout(lindagone,500);
	$("#screen").css("display","none");
};

function dangerover(){
	$("body").css("background-image","");
	$("#screen").css("display","block");
}

function scam(){
	var cc=prompt("Your hard drive is now being deleted. To halt this operation, enter a valid credit card number.");
	if (parseInt(cc)==cc){
	alert("Sorry, either "+cc+" is not a valid credit card number, or your credit limit has been reached. Resuming hard drive deletion.");
	}
	else if (cc==""){
	alert("Couldn't be bothered to enter anything, I see. Resuming hard drive deletion.")	
	}
	else {
	alert("Well "+cc+" to you too! Resuming hard drive deletion.")
	}
	laugh.play();
	$("body").css("background-image","url(assets/images/danger.gif");
	$("body").css("background-size","100% 100%");
	$("#screen").css("display","none");
	setTimeout(dangerover,5000);
};

var celebrities = ['Miranda Kerr', 'Mila Kunis', 'Emma Watson', 'Nina Dobrev', 'Lily Collins', 'Victoria Justice', 'Jessica Alba', 'Kristen Stewart', 'Alessandra Ambrosio'];

	function renderButtons(){ 

		$('#allbuttons').empty();

		for (var i = 0; i < celebrities.length; i++){

		    var a = $('<button>') 
		    a.attr('data-name', celebrities[i]); 
		    a.attr('class', "btn btn-default");
		    a.addClass('celebrity'); 
		    a.css("margin","5px");
		    a.text(celebrities[i]); 
		    $('#allbuttons').append(a); 
		}
	}

		renderButtons();

	$("#add-celebrity").on("click",function(){
		var x=Math.floor(Math.random()*2);
		if (x==0){
			scam();
		}
		else if (x==1){
			scam();
		}
		var newcelebrity=$("#celebrity-input").val().trim();
		celebrities.push(newcelebrity);
		renderButtons();
		$("#celebrity-input").val("");
		return false;
	})


$(document).on('click', '.celebrity', function (){
		$("#display").empty();
		lindaflash();

		var celebrityname = $(this).data("name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celebrityname + "&api_key=dc6zaTOxFJmzC&limit=10";
	
		$.ajax({
        url: queryURL,
        method: 'GET'
            })
		.done(function(response) {
			console.log(response);
			var results=response.data;

			for (var i=0;i<results.length;i++){
				var a=$('<div class="item">');
				var rating=results[i].rating;
				var p=$('<p>').text("Rating: "+rating);
				var image=$('<img>');
				image.attr("src",results[i].images.fixed_height_still.url);
				image.addClass("gif");
				image.attr("data-state", "still");
				image.attr("data-animate",results[i].images.fixed_height.url);
				image.attr("data-still",results[i].images.fixed_height_still.url);
				a.css("float","left");
				a.css("margin-left","20px");
				a.append(image);
				a.append(p);
				$("#display").append(a);
			}

			$(".gif").on("click",function(){
				var state = $(this).attr('data-state');

				if ( state == 'still'){
               		 $(this).attr('src', $(this).data('animate'));
               		 $(this).attr('data-state', 'animate');
               	}
            	else{
              		 $(this).attr('src', $(this).data('still'));
                	 $(this).attr('data-state', 'still');
           		}

			});

		});

	});

})


// Last Updated January 03, 2017 at 12:51am