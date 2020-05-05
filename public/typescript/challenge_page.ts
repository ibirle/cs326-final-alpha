

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

async function submitComment(content) : Promise<any>{
    let challenge_ID = getParameterByName("challengeID");
    let userID = getParameterByName("userID");
    let data =
    {
        "content": content,
        "user_ID": userID,
        "competition_ID": challenge_ID
    }
    let response = await fetch('/api/submitComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(data),
    });
    return response.json();
}

async function addComment(){
    let content = $("#input-comment-content").val();
    await submitComment(content);
}

async function loadComments(){
    let challenge_ID = getParameterByName("challengeID");
    let data =
    {
        "competition_ID": challenge_ID
    }
    let response = await fetch('/api/getComments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(data),
    });

    let res = await response.json();
    return res.rows;
}

async function fillComments(){
    let comments = await loadComments();
    let commentRow = $("#comment-tab-content");
    for(let c of comments){
        commentRow.prepend(createCommentObject(c));
    }
}

function createCommentObject(comment){

    return "<div class='row no-gutter comment-card'> " +
    "<div id='profile-info' class='col-2'> " +
      "<div class='d-flex justify-content-center'>" +
        "<img src='pictures/defaultProfile.jpg' class='profile-picture' alt='Profile Picture'>" +
      "</div>" +
      "<div class='d-flex justify-content-center'>" +
        "<h5>" + comment.user_name + "</h5>" +
      "</div>" +
    "</div>" +
    "<div id='comment-body' class='col-10'> " +
        "<p>"+ comment.content + "</p>" +
    "</div> "+
    "</div>";
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

async function loadEntries(challenge_ID) {
    let response = await fetch('/api/getEntries', {
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
    let challenge_ID = getParameterByName("challengeID");
    let challenge = await load(challenge_ID);
    let entries = await loadEntries(challenge_ID);
    fillChallenge(challenge);
    fillEntries(entries);


    $(".entry-heart-img").click(function() {
        let entryID = $(this).attr("id")
        let userID = getParameterByName("userID");
        voteForEntry(challenge_ID, entryID, userID);
        $(".entry-heart-img-voted").attr("src", "pictures/outline_favorite_border_black_48dp.png").addClass("entry-heart-img").removeClass("entry-heart-img-voted");
        $(this).attr("src", "pictures/outline_favorite_black_48dp.png").addClass("entry-heart-img-voted").removeClass("entry-heart-img");
    })

    fillComments();
})

async function voteForEntry(challenge_ID, entry_ID, user_ID) {
    let response = await fetch('/api/voteFor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({"challengeID": challenge_ID,
                              "entry_ID": entry_ID,
                              "user_ID": user_ID})
    });
    return response.json();
}

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
    let urlsPromises: Array<Promise<string>> = [];
    let file;
    for(file of files!){
        if(file == null){
            return alert('No file selected.');
          }
         urlsPromises.push(getSignedRequest(file));
    }
    let urls: Array<string> = [];
    for(let p of urlsPromises){
        let url= await p.catch(err => { console.log(err); alert("Upload Failed"); return;}) as string;
        console.log(url);
        urls.push(url);
    }
    let challenge_ID = getParameterByName("challengeID");
    console.log(challenge_ID);
    let userID = getParameterByName("userID");
    let data = {
        "user_ID": userID,
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
    location.reload();
}

function fillEntries(entries) {
    let entryCars = createEntries(entries);
    $("#entry-tab-content").append(entryCars)

}

function createEntries(entries) {

    
    let entryStuff = "";
    
    for (let i = 0; i < entries.rows.length; i++) {
        let entryPics = JSON.parse("[" + entries.rows[i].entry_pics.substring(1, entries.rows[i].entry_pics.length - 1) + "]");
        entryStuff = entryStuff.concat(
                "<div class='col-sm-12 col-md-6 col-lg-4 justify-content-center'>" +
                    "<div class='entry-heart justify-content-center'>" +
                        "<img id='" + entries.rows[i].entry_ID + "'class='entry-heart-img' src='pictures/outline_favorite_border_black_48dp.png'>" +
                    "</div>" +
                    "<div id='carouselExampleIndicators" + entries.rows[i].entry_ID + "' class='carousel slide'>" +
                        "<ol class='carousel-indicators'>" +
                        "<li data-target='#carouselExampleIndicators" + entries.rows[i].entry_ID + "' data-slide-to='0' class='active'></li>" +
                        "<li data-target='#carouselExampleIndicators" + entries.rows[i].entry_ID + "' data-slide-to='1'></li>" +
                        "<li data-target='#carouselExampleIndicators" + entries.rows[i].entry_ID + "' data-slide-to='2'></li>"+
                        "</ol>"+
                        "<div class='carousel-inner'>");
        /*      
        entryStuff = entryStuff.concat(
                            "<div class='carousel-item small-img-card active'>"+
                                "<img class='d-block w-100' src='pictures/dailycardTest1.jpg' alt='First slide'>"+
                            "</div>"+
                            "<div class='carousel-item small-img-card'>"+
                                "<img class='d-block w-100' src='pictures/dailycardTest1.jpg' alt='Second slide'>"+
                            "</div>"+
                            "<div class='carousel-item small-img-card'>"+
                                "<img class='d-block w-100' src='pictures/dailycardTest1.jpg' alt='Third slide'>"+
                            "</div>");
        */
        
        for (let j = 0; j < entryPics.length; j++) {
            if (j === 0) {
                entryStuff = entryStuff.concat(
                    "<div class='carousel-item small-img-card active'>"+
                        "<img class='d-block w-100' src='" + entryPics[j] + "' alt='First slide'>" +
                    "</div>"
                )
            }
            else {
                entryStuff = entryStuff.concat(
                    "<div class='carousel-item small-img-card'>"+
                        "<img class='d-block w-100' src='" + entryPics[j] + "' alt='First slide'>" +
                    "</div>"
                )
            }
        }
        
        entryStuff = entryStuff.concat(
                        "</div>"+
                        "<a class='carousel-control-prev' href='#carouselExampleIndicators" + entries.rows[i].entry_ID + "' role='button' data-slide='prev'>"+
                        "<span class='carousel-control-prev-icon' aria-hidden='true'></span>"+
                        "<span class='sr-only'>Previous</span>"+
                        "</a>"+
                        "<a class='carousel-control-next' href='#carouselExampleIndicators" + entries.rows[i].entry_ID + "' role='button' data-slide='next'>"+
                        "<span class='carousel-control-next-icon' aria-hidden='true'></span>"+
                        "<span class='sr-only'>Next</span>"+
                        "</a>"+
                    "</div>"+
                "</div>");
    }
    return entryStuff;
}

function getParameterByName(name) {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}