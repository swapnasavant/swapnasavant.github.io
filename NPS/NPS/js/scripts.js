  $(function() {
    var availableTags = [
      "Yellowstone National Park",
      "Yosemite National Park"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags,
	    select: function(event, ui) {
        if(ui.item){
		var $header_background = $("#adventure");
		$("#park_adventure").html('');
		   if(ui.item.value == "Yellowstone National Park"){		
		   $header_background.removeClass("adventure");
		   $header_background.addClass("yellowstone_adventure");
		   $header_background.css({'background-size':'cover', 'transition': '2.5s'});
		   populateYellowStoneActivities()
		}else if(ui.item.value == "Yosemite National Park"){
		    $header_background.removeClass("adventure");
		    $header_background.addClass("yosemite_adventure");
			$header_background.css({'background-size':'cover', 'transition': '2.5s'});
			populateYosemiteActivities();
		   }
		 else{
			 $header_background.removeClass("adventure");
		    $header_background.addClass("death_valley");
			$header_background.css({'background-size':'cover', 'transition': '2.5s'});		
		}
		   $("#adventure_btn").css("display","block");	
		   displayWeather(ui.item.value);
        }
		}
    });
	function displayWeather(value){
	  $.simpleWeather({
		location: value,
		woeid: '',
		unit: 'f',
		success: function(weather) {
		  html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
		  html += '<ul>';
		  html += '<li class="currently">'+weather.currently+'</li>';
		  html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
	  
		  $("#weather").html(html);
		},
		error: function(error) {
		  $("#weather").html('<p>'+error+'</p>');
		}
	  });
  }
  function getSeason(){
    var d = new Date();
	var season = null;
	switch (new Date().getMonth()) {
    case 0:
        season = "winter";
        break;
    case 1:
        season = "winter";
        break;
    case 2:
        season = "winter";
        break;
    case 3:
        season = "Spring";
        break;
    case 4:
        season = "Spring";
        break;
    case 5:
        season = "Summer";
        break;
    case 6:
        season = "Summer";
	case 7:
        season = "Summer";
	case 8:
        season = "Summer";
	case 9:
        season = "Fall";
	case 10:
        season = "Fall";
	case 11:
        season = "Fall";
	case 12:
        season = "winter";
        break;
	}   
	return season;
	}
  function populateYosemiteActivities(){
    var season = getSeason();
	 if(season=="winter"){	
		var content = $("#yosemite_winter").html();
		$("#park_adventure").html(content);
		$("#park_adventure").css("display","block");
		$("#park_adventure").css("background-color","black");
	 }
	 if(season=="Summer" || season=="Spring"){	
		var content = $("#yosemite_summer").html();
		$("#park_adventure").html(content);
		$("#park_adventure").css("display","block");
		$("#park_adventure").css("background-color","#FEEECA");
		$('.weather_wise').css("position","absolute");
	 }
	 if(season=="Fall"){	
		var content = $("#yosemite_fall").html();
		$("#park_adventure").html(content);
		$("#park_adventure").css("display","block");
		$("#park_adventure").css("background-color","#eee3b1");
		$('.weather_wise').css("position","absolute");
	 }
	   $(".thumb").hover(
  function() {
       $(this).find("img").addClass("thumb_noshow"); 
	   $(this).find("h3").css("display","inline-block")
	   $(this).find("h3").addClass("img_content"); 
  }, function() {
		$(this).find("h3").css("display","none")
       $(this).find("img").removeClass("thumb_noshow"); 
	   $(this).find("h3").removeClass("img_content"); 
  }
);
  }
  
function populateYellowStoneActivities(){
     var season = getSeason();
	 if(season=="winter"){	
		var content = $("#yellowstone_winter").html();
		$("#park_adventure").html(content);
		$("#park_adventure").css("display","block");
		$("#park_adventure").css("background-color","black");
	 }
	 if(season=="Summer" || season=="Spring" || season=="Fall"){	
		var content = $("#yellowstone_summer").html();
		$("#park_adventure").html(content);
		$("#park_adventure").css("display","block");
		$("#park_adventure").css("background-color","#FEEECA");
		$('.weather_wise').css("position","absolute");
	 }
	   $(".thumb").hover(
		  function() {
			   $(this).find("img").addClass("thumb_noshow"); 
			   $(this).find("h3").css("display","inline-block")
			   $(this).find("h3").addClass("img_content"); 
		  }, function() {
				$(this).find("h3").css("display","none")
			   $(this).find("img").removeClass("thumb_noshow"); 
			   $(this).find("h3").removeClass("img_content"); 
		  }
		);
	}
});

$(document).ready(function(){   
var arr = [1, 2, 3, 4, 5, 6];
var cnt=0, bg;
var $background_image = $('#background_image');
 
		resizeMenu();
	  $('#bxslider').bxSlider({
		    auto: false,
		    tickerHover: false,
		    autoHover: false,
			speed: 1000,
			default: 'Stop'
		  });
	var bgrotater = setInterval(function() {
		if (cnt==5) cnt=0;
		//bg = 'url("' + arr[cnt] + '")';
		bg = 'images/photogallery/pic_thumb' + arr[cnt] + '.jpg';
		cnt++;
		$background_image.attr("src",bg);
		$background_image.css({'background-size':'cover', 'transition': '2.5s'});
	}, 4000);
});
$(window).resize(function(){
		resizeMenu();
		if	($('body').width() >= 980 )	{
			$('nav').css('display', 'block');
		}else if($('body').width() < 980 )	{
			$('nav').css('display', 'none');
		}	
		});
		
	function resizeMenu(){
		var bodyWidth = $('body').width();
		if (bodyWidth > 980) {
			$('#menu-dd-icon').css('display', 'none');
		}else{
			var menuWidth = bodyWidth - 315;
			$('#menu-dd-icon').css('width', menuWidth + 'px');
			$('#menu-dd-icon').css('display', 'block');
			}		
		};
		
		$("a.menu-toggle").click(function(e) {
		    e.preventDefault();
		    $("nav").fadeToggle( "slow", "linear" ); 
		    return false;  
		});  