$(document).ready(function(){
	var content = $("#content")[0];
	var header = $(content).children('.detail-header')[0];
	$(content).scroll(function(){
		if ($(content).scrollTop() > 50) {
			$(header).addClass("shrinkAndFix");
		} else {
			$(header).removeClass("shrinkAndFix");
		}
	});
});
