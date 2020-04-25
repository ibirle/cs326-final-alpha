

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
    let com =  await submitComment();
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
    comment!.innerHTML = fill;
}

async function load(challenge_ID) {
    let response = await fetch('/api/getChallenge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({"challengeID": challenge_ID}),
    });
    return response.json();
}

function fillChallenge(challenge) {
    $("#recipe").append(
        "<div id='recipe-block' class='row no-gutter'>" +
                    "<div class='col-lg-4 col-md-12'>" +
                        "<img src='" + challenge.rows[0].detail_link + "' class='img-fluid recipe-img' alt='Bread'>" +
                    "</div>" + 
                    "<div id='recipe-description' class='col-lg-8 col-md-12'>" +
                        "<h4>" + challenge.rows[0].competition_name + ":</h4>" +
                        "<p>" + challenge.rows[0].recipe_desc +
                        "</p>" +
                        "<a target='_blank' href='" + challenge.rows[0].recipe_link + "'>Link to Recipe</a>" +
                    "</div>" +
                "</div>");
}

$(document).ready(async function() {
    let challenge_ID = parseInt(window.location.search.substring(13));
    let challenge = await load(challenge_ID);
    console.log(challenge);
    fillChallenge(challenge);
    fillEntries(challenge_ID);
    $(".entry-heart-img").click(function() {
        $(".entry-heart-img-voted").attr("src", "pictures/outline_favorite_border_black_48dp.png").addClass("entry-heart-img").removeClass("entry-heart-img-voted");
        $(this).attr("src", "pictures/outline_favorite_black_48dp.png").addClass("entry-heart-img-voted").removeClass("entry-heart-img");
    })
})

async function getSignedRequest(file): Promise<string>{
    let response = await fetch("/api/sign-s3?file-name="+file.name+"&file-type="+file.type, {
        method: 'GET'
    });
    let res = await response.json();
    await uploadFile(file, res.signedRequest, res.url);
    return res.url;
}

async function uploadFile(file, signedRequest, url){
    await fetch(signedRequest, {
        method: 'PUT',
        body: file
    });
}

async function submitEntry(){
    let files = (document.getElementById('entry-file-upload') as HTMLInputElement).files;
    let urls: Array<Promise<string>> = [];
    let file;
    for(file of files!){
        if(file == null){
            return alert('No file selected.');
          }
         urls.push(getSignedRequest(file));
    }

    await Promise.all(urls).catch(err => { console.log(err); alert("Upload Failed"); return;});
    console.log(urls);
    let challenge_ID = parseInt(window.location.search.substring(13));
    console.log(challenge_ID);
    console.log(urls[0]);
    let data = {
        "user_ID": 1,
        "competition_ID": challenge_ID,
        "urls": urls
    };

    await fetch('/api/submitEntry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(data)
    }).catch(err => { console.log(err); alert("Upload Failed"); return;});
    alert("Upload Successful");
}

function fillEntries(challenge_ID) {
    for (let i = 0; i<8; i++) {
        $("#entry-tab-content").append(
                "<div class='col-sm-12 col-md-6 col-lg-4 justify-content-center'>" +
                    "<div class='entry-heart justify-content-center'>" +
                        "<img class='entry-heart-img' src='pictures/outline_favorite_border_black_48dp.png'>" +
                    "</div>" +
                    "<div id='carouselExampleIndicators' class='carousel slide'>" +
                        "<ol class='carousel-indicators'>" +
                        "<li data-target='#carouselExampleIndicators' data-slide-to='0' class='active'></li>" +
                        "<li data-target='#carouselExampleIndicators' data-slide-to='1'></li>" +
                        "<li data-target='#carouselExampleIndicators' data-slide-to='2'></li>"+
                        "</ol>"+
                        "<div class='carousel-inner'>"+
                        "<div class='carousel-item small-img-card active'>"+
                            "<img class='d-block w-100' src='pictures/dailycardTest1.jpg' alt='First slide'>"+
                        "</div>"+
                        "<div class='carousel-item small-img-card'>"+
                            "<img class='d-block w-100' src='pictures/dailycardTest1.jpg' alt='Second slide'>"+
                        "</div>"+
                        "<div class='carousel-item small-img-card'>"+
                            "<img class='d-block w-100' src='pictures/dailycardTest1.jpg' alt='Third slide'>"+
                        "</div>"+
                        "</div>"+
                        "<a class='carousel-control-prev' href='#carouselExampleIndicators' role='button' data-slide='prev'>"+
                        "<span class='carousel-control-prev-icon' aria-hidden='true'></span>"+
                        "<span class='sr-only'>Previous</span>"+
                        "</a>"+
                        "<a class='carousel-control-next' href='#carouselExampleIndicators' role='button' data-slide='next'>"+
                        "<span class='carousel-control-next-icon' aria-hidden='true'></span>"+
                        "<span class='sr-only'>Next</span>"+
                        "</a>"+
                    "</div>"+
                "</div>")
    };
}