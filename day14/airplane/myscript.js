$("#moveme").css('position', 'absolute');
$(document).on('mousemove', 'html', function(event) {
$("#moveme").css({
        left: event.pageX,
        top: event.pageY
    });
});

$(document).click(function(event) {
    $(this).off("mousemove");
    $('#moveme').show().fadeOut("slow").fadeIn("fast");

});
