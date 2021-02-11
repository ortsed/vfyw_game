var lastLoaded = -1;
$(document).ready(function(){
	$(document).scroll(function(){
		var next = lastLoaded + 1;
		if ($(document).scrollTop() > $("#archives ol li:eq(" + next +")").position().top - $(window).height()){
			$.get('/ajax/' + $("#archives ol li:eq(" + next +")").attr("id") + '/', function(data){
				$("#archives ol li:eq(" + next +")").append(data);
				$("#archives ol li:eq(" + next +") .entry").fadeIn();
			});
			lastLoaded++;
		}
	});

});