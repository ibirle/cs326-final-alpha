//hi5
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
$('.carousel').carousel({
    interval: false
});
var textarea = $('.form-control');
textarea.on("input", function () {
    $(this).css("height", ""); //reset the height
    $(this).css("height", Math.min($(this).prop('scrollHeight'), 200) + "px");
});
function entryTab() {
    $("#entry-tab-content").show();
    $("#submit-tab-content").hide();
    $("#comment-tab-content").hide();
    $("#entry-tab").addClass("selected");
    $("#submit-tab").removeClass("selected");
    $("#comment-tab").removeClass("selected");
}
function submitTab() {
    $("#entry-tab-content").hide();
    $("#submit-tab-content").show();
    $("#comment-tab-content").hide();
    $("#entry-tab").removeClass("selected");
    $("#submit-tab").addClass("selected");
    $("#comment-tab").removeClass("selected");
}
function commentTab() {
    $("#entry-tab-content").hide();
    $("#submit-tab-content").hide();
    $("#comment-tab-content").show();
    $("#entry-tab").removeClass("selected");
    $("#submit-tab").removeClass("selected");
    $("#comment-tab").addClass("selected");
}
function load(challenge_ID) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch('/api/getChallenge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ "challengeID": challenge_ID }),
        });
        return response.json();
    });
}
function fillChallenge(challenge) {
    $("#recipe").append("<div id='recipe-block' class='row no-gutter'>" +
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
$(document).ready(function () {
    return __awaiter(this, void 0, void 0, function* () {
        let challenge_ID = parseInt(window.location.search.substring(13));
        let challenge = yield load(challenge_ID);
        console.log(challenge);
        fillChallenge(challenge);
    });
});
