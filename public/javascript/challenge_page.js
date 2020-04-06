$('.carousel').carousel({
    interval: false
});

function entryTab()
{
    $("#entry-tab-content").show();
    $("#submit-tab-content").hide();
    $("#comment-tab-content").hide();

    $("#entry-tab-link").addClass("active");
    $("#submit-tab-link").removeClass("active");
    $("#comment-tab-link").removeClass("active");
}

function submitTab()
{
    $("#entry-tab-content").hide();
    $("#submit-tab-content").show();
    $("#comment-tab-content").hide();

    $("#entry-tab-link").removeClass("active");
    $("#submit-tab-link").addClass("active");
    $("#comment-tab-link").removeClass("active");
}

function commentTab()
{
    $("#entry-tab-content").hide();
    $("#submit-tab-content").hide();
    $("#comment-tab-content").show();

    $("#entry-tab-link").removeClass("active");
    $("#submit-tab-link").removeClass("active");
    $("#comment-tab-link").addClass("active");
}


