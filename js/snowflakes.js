$(document).ready(function() {
    $(".fiocco-hover").mouseover(function() {
        var platform = $(this).attr("platform");
        $(".fiocco-hide").not("#" + platform).css("opacity", 0.2)
        $("#etichette-" + platform).css("opacity", 1)
    });

    $(".fiocco-hover").mouseout(function() {
        var platform = $(this).attr("platform");
        $(".fiocco-hide").css("opacity", 1)
        $("#etichette-" + platform).css("opacity", 0)
    });
})