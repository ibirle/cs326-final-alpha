"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
function submitComment() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch('/api/submitCommnet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({}),
        });
        return response.json();
    });
}
function getUser() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch('/api/getAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({}),
        });
        return response.json();
    });
}
function addcomment() {
    return __awaiter(this, void 0, void 0, function* () {
        let com = yield submitComment();
        let user = getUser();
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
            "<p>" + com.content + "</p>" +
            "</div> " +
            "</div>";
        comment.innerHTML = fill;
    });
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
function getSignedRequest(file) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch("/api/sign-s3?file-name=" + file.name + "&file-type=" + file.type, {
            method: 'GET'
        });
        let res = yield response.json();
        yield uploadFile(file, res.signedRequest, res.url);
        return res.url;
    });
}
function uploadFile(file, signedRequest, url) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(signedRequest, {
            method: 'PUT',
            body: file
        });
    });
}
function submitEntry() {
    return __awaiter(this, void 0, void 0, function* () {
        let files = document.getElementById('entry-file-upload').files;
        let urls = [];
        let file;
        for (file of files) {
            if (file == null) {
                return alert('No file selected.');
            }
            urls.push(getSignedRequest(file));
        }
        yield Promise.all(urls).catch(err => { alert(err); return; });
        let data = {
            "user_ID": 1,
            "urls": urls
        };
        yield fetch('/api/submitEntry', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        alert("Upload Successful");
    });
}
