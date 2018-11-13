$("#chapter1").hover(
    function() {
        $(".rect-gradient").attr("id", "first-rect2");
        $(".circle-gradient").attr("id", "circle-gradient2");
        $(".title").attr("id", "title-change1");
        $(".gradient-rectangle").attr("id", "gradient-horizontal2");
    },
    function() {
        $(".rect-gradient").attr("id", "first-rect");
        $(".circle-gradient").attr("id", "circle-gradient");
        $(".title").attr("id", "prova");
        $(".gradient-rectangle").attr("id", "gradient-horizontal");
    }
);

$("#chapter2").hover(
    function() {
        $(".rect-gradient").attr("id", "first-rect3");
        $(".circle-gradient").attr("id", "circle-gradient3");
        $(".title").attr("id", "title-change2");
        $(".gradient-rectangle").attr("id", "gradient-horizontal3");
    },
    function() {
        $(".rect-gradient").attr("id", "first-rect");
        $(".circle-gradient").attr("id", "circle-gradient");
        $(".title").attr("id", "prova");
        $(".gradient-rectangle").attr("id", "gradient-horizontal");
    }
);

$("#chapter3").hover(
    function() {
        $(".rect-gradient").attr("id", "first-rect4");
        $(".circle-gradient").attr("id", "circle-gradient4");
        $(".title").attr("id", "title-change3");
        $(".gradient-rectangle").attr("id", "gradient-horizontal4");
    },
    function() {
        $(".rect-gradient").attr("id", "first-rect");
        $(".circle-gradient").attr("id", "circle-gradient");
        $(".title").attr("id", "prova");
        $(".gradient-rectangle").attr("id", "gradient-horizontal");
    }
);

$("#chapter4").hover(
    function() {
        $(".rect-gradient").attr("id", "first-rect5");
        $(".circle-gradient").attr("id", "circle-gradient5");
        $(".title").attr("id", "title-change4");
        $(".gradient-rectangle").attr("id", "gradient-horizontal5");
    },
    function() {
        $(".rect-gradient").attr("id", "first-rect");
        $(".circle-gradient").attr("id", "circle-gradient");
        $(".title").attr("id", "prova");
        $(".gradient-rectangle").attr("id", "gradient-horizontal");
    }
);

$("#chapter5").hover(
    function() {
        $(".rect-gradient").attr("id", "first-rect6");
        $(".circle-gradient").attr("id", "circle-gradient6");
        $(".title").attr("id", "title-change5");
        $(".gradient-rectangle").attr("id", "gradient-horizontal6");
    },
    function() {
        $(".rect-gradient").attr("id", "first-rect");
        $(".circle-gradient").attr("id", "circle-gradient");
        $(".title").attr("id", "prova");
        $(".gradient-rectangle").attr("id", "gradient-horizontal");
    }
);

/*introdiv*/
function openDiv(platform) {
    console.log($("#cassetto-" + platform).attr("style"))
    if ($("#cassetto-" + platform).css("display") == "none") {
        $(".platform-name-thumbnail").css("color", "white");
        $("#" + platform).css("color", "#a770ef");
        $(".open-div-intro").hide();
        $("#cassetto-" + platform).show();
    } else {
        $(".platform-name-thumbnail").css("color", "white");
        $(".open-div-intro").hide();
    }
}

$("#facebook").click(function() {
    openDiv("facebook");
});
$("#google").click(function() {
    openDiv("google");
});
$("#apple").click(function() {
    openDiv("apple");
});
$("#instagram").click(function() {
    openDiv("instagram");
});
$("#spotify").click(function() {
    openDiv("spotify");
});
$("#twitter").click(function() {
    openDiv("twitter");
});
$("#whatsapp").click(function() {
    openDiv("whatsapp");
});

/*
	Smooth scroll functionality for anchor links (animates the scroll
	rather than a sudden jump in the page)
*/
$('.js-anchor-link').click(function(e) {
    e.preventDefault();
    var target = $($(this).attr('href'));
    if (target.length) {
        var scrollTo = target.offset().top;
        $('body, html').animate({ scrollTop: scrollTo + 'px' }, 600);
    }
});

function rotate_circle(chapter) {
    angle = 360 / 7 * chapter;
    var cx = window.innerWidth * 0.6;
    var cy = window.innerHeight * 0.5;
    $('.circle-gradient').attr("transform", "rotate(" + angle + " " + cx + " " + cy + ")");
}
