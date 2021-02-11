var currentLevel = 0;
var guesses = 50;
var lowestLevel = 10;
function initialize() {
	if (GBrowserIsCompatible()) {
		var map = new GMap2(document.getElementById("map_canvas"));
		//map.setUIToDefault();
		
		map.enableContinuousZoom();
		map.disableDragging();
	}
	return map;
}
 
function start(){
	currentLevel = 0;
	resetGrid();
	$("#vfywScoreValue").text(guesses);
	map.setCenter(new GLatLng(0,0), googleLevel());
	
}
 
function getRandom(){
	$.getJSON('/rand',{}, function(data){
		$("#vfywClue img").attr("src",data.image);
		$("#vfywClue").show();
		answer = new GLatLng(parseFloat(data.latitude), parseFloat(data.longitude), false);
		$("#gameWon #location").html(data.title);
		$("#gameWon .originalThread a").attr('href',data.description);
		$("#gameWon .coordinates a").text(data.latitude + ', ' + data.longitude);
		$("#gameWon .coordinates a").attr('href', 'http://maps.google.com/maps?q=' + data.latitude + ',+' + data.longitude);
	});
}
 
function checkAnswer(level, obj){
	var score = $("#vfywScoreValue");
	var scoreVal = parseInt(score.text());
	if (scoreVal > 0){
	
		score.text(parseInt(score.text()) - 1);
 
 
		//Get the lat/lng bounds of the guessed rectangle 
		var guessBounds = new GLatLngBounds(
			map.fromDivPixelToLatLng(new GPoint($(obj).position().left, $(obj).position().top + $(obj).height())) ,
			map.fromDivPixelToLatLng(new GPoint($(obj).position().left + $(obj).width(), $(obj).position().top))
		);
	
		if (guessBounds.containsLatLng(answer)){
			return true;
		}else {
			return false;
		}
	}else {
		gameOver();
	}
}
function dialogueOpen(text){
	$("#dialogue").html(text);
	$("#dialogue").show();
}
function dialogueClose(){
	$("#dialogue").hide();
}
 
function resetGrid(){
	$("#vfywGrid a").removeClass("incorrect");
}
 
function wrongAnswer(obj){
	obj.addClass("incorrect");
}
 
function correctAnswer(event, obj) {
	resetGrid();
	nextLevel(event, obj);
}
 
function nextLevel(event, obj){
	var offset = $("#map_canvas").offset();
	var gpointVal = new GPoint(event.pageX - offset.left, event.pageY - offset.top);
	currentLevel++;
	var latLng = map.fromDivPixelToLatLng(gpointVal);
	var newLatLng = new GLatLng(latLng.lat(),  latLng.lng());
	map.zoomIn(newLatLng, true, true);
	
	console.log(map.getZoom());
	//check if its the last level
	if (map.getZoom() == lowestLevel){
		win();
	}
 
}
function newGame(){
	dialogueClose();
	getRandom();
	start();
}
function resetGame(){
	dialogueClose();
	start();
}
function gameOver(){
	
	dialogueOpen($("#gameOver").html());
	
}
function win(){
	dialogueOpen($("#gameWon").html());
}
 
function googleLevel(){
	return currentLevel + 2;
}
 
$(document).ready(function(){
	map = initialize();
	var answer;
	start();
	getRandom();
	$("#vfywGrid a").click(function(event){
		
		if (checkAnswer(currentLevel, this)){
			correctAnswer(event, this);
		}else {
			wrongAnswer($(this));
		}
		return false;
	});
	
	//Set controls on links
	$(".expandClue").toggle(function(){
		$("#vfywClue img").animate({width: "500px"});
		$("#sideboard").animate({width: "500px"});
	}, function(){
		$("#vfywClue img").animate({width: "100px"});
		$("#sideboard").animate({width: "100px"});
	});
	
	$("#satelliteControl").click(function(){
		map.setMapType(G_SATELLITE_MAP);
		return false;
	});
	
	$("#normalControl").click(function(){
		map.setMapType(G_NORMAL_MAP);
		return false;
	});
	
//	$("#earthControl").click(function(){
//		map.setMapType(G_SATELLITE_3D_MAP);
//	});
	
	$("#resetControl").click(function(){
		resetGame();
		return false;
	});
	
	$("#newControl").click(function(){
		newGame();
		return false;
	});
 
});
 
