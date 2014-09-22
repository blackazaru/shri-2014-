$("#show").click(function () {
    $("#popup").fadeIn();
    $("#background-popup").fadeIn();
});

$("#close-popup").click(function () {
    $("#popup").fadeOut();
    $("#background-popup").fadeOut();
});
$("#button-ok").click(function () {
    $("#popup").fadeOut();
    $("#background-popup").fadeOut();
});

$(document).keyup(function (e) {

    if (e.keyCode == 27) {
        $("#popup").fadeOut();
        $("#background-popup").fadeOut();
    }   // esc
});