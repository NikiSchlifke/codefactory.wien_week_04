$("#showhide").click(function(event) {
	var visibility = $("#shoppingcart").css('visibility');

	if (visibility == "hidden") {
		$("#shoppingcart").css('visibility', 'visible');
	} else {
		$("#shoppingcart").css('visibility', 'hidden');
	}
});