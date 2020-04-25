//hi5

$('.carousel').carousel({
    interval: false
});

var textarea = $('.form-control');
textarea.on("input", function () {
    $(this).css("height", ""); //reset the height
    $(this).css("height", Math.min($(this).prop('scrollHeight'), 200) + "px");
});


function entryTab()
{
    $("#entry-tab-content").show();
    $("#submit-tab-content").hide();
    $("#comment-tab-content").hide();

    $("#entry-tab").addClass("selected");
    $("#submit-tab").removeClass("selected");
    $("#comment-tab").removeClass("selected");
}

function submitTab()
{
    $("#entry-tab-content").hide();
    $("#submit-tab-content").show();
    $("#comment-tab-content").hide();

    $("#entry-tab").removeClass("selected");
    $("#submit-tab").addClass("selected");
    $("#comment-tab").removeClass("selected");
}

function commentTab()
{
    $("#entry-tab-content").hide();
    $("#submit-tab-content").hide();
    $("#comment-tab-content").show();

    $("#entry-tab").removeClass("selected");
    $("#submit-tab").removeClass("selected");
    $("#comment-tab").addClass("selected");
}
async function submitComment() : Promise<any>{
    let response = await fetch('/api/submitCommnet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({}),
    });
    return response.json();
}
async function getUser() : Promise<any> { 
    let response = await fetch('/api/getAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({}),
    });
    return response.json();

}
async function addcomment(){
    let com =  submitComment();
    let user =  getUser();
    let comment = document.getElementById('tofill');
    let fill = "<div class='row no-gutter comment-card'> " +
    "<div id='profile-info' class='col-2'> " +
      "<div class='d-flex justify-content-center'>" +
        "<img src='pictures/defaultProfile.jpg' class='profile-picture' alt='Profile Picture'>" +
      "</div>" +
      "<div class='d-flex justify-content-center'>" +
        "<h5>" + com.user_ID + "</h5>" +
      "</div>" +
    "</div>" +
    "<div id='comment-body' class='col-10'> " +
        "<p>"+ com.content + "</p>" +
    "</div> "+
"</div>";
    comment.innerHTML = fill;
}

