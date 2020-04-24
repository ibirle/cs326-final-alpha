/**let url = require('url');

function getChallenge(){
    let challengeName = document.getElementById().value;
    const newUrl = url;
}**/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*
Fills front page with current challenges
*/
$(document).ready(function () {
    return __awaiter(this, void 0, void 0, function* () {
        let challenges = yield loadChallenges();
        let chals = separateChals(challenges);
        fillChallengesWeekly(chals[0]);
        fillChallengesDaily(chals[1]);
    });
});
function loadChallenges() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch('/api/getAllCurrentChallenges', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({}),
        });
        return response.json();
    });
}
/*
Separates the loaded challenges into daily and weekly challenges for function calls
*/
function separateChals(challenges) {
    let weeklies = new Array();
    let dailies = new Array();
    for (let i = 0; i < challenges.rows.length; i++) {
        if (challenges.rows[i]["competition_type"] === "weekly") {
            weeklies.push(challenges.rows[i]);
        }
        else {
            dailies.push(challenges.rows[i]);
        }
    }
    return ([weeklies, dailies]);
}
function fillChallengesWeekly(challenges) {
    console.log("hi");
    $("#weekly").append("<a href='challenge_page.html' class='text-dark'>" +
        "<div id='weeklyCard' class='card'>" +
        "<img src='" + challenges[0].cover_link + "' class='card-img img-fluid wide-img-card' alt='Picture of bread'>" +
        "<div class='centered'>" +
        "<h5>" + challenges[0].competition_name + "</h5>" +
        "</div>" +
        "</div>" +
        "</a>");
    console.log("hi2");
    $("#weekly").append("<a href='challenge_page.html' class='text-dark'>" +
        "<div id='weeklyCard' class='card'>" +
        "<img src='" + challenges[1].cover_link + "' class='card-img img-fluid wide-img-card' alt='Picture of bread'>" +
        "<div class='centered'>" +
        "<h5>" + challenges[1].competition_name + "</h5>" +
        "</div>" +
        "</div>" +
        "</a>");
    console.log("hi2");
}
function fillChallengesDaily(challenges) {
    console.log("here");
    let row = $("#daily-cards-row");
    let c;
    for (c of challenges) {
        let cardCol = createDailyCard(c);
        row.append(cardCol);
    }
}
function createDailyCard(challenge) {
    console.log("here 2");
    let col = $('<div/>', {
        "class": 'col-sm-12 col-md-6 col-lg-4'
    });
    let card = $('<div/>', {
        "class": 'card daily-card'
    });
    let img = $('<img/>', {
        "class": 'card-img img-fluid small-img-card',
        "src": challenge.cover_link,
        "alt": "Photo for " + challenge.competition_name + " competition"
    });
    let title = $('<div/>', {
        "class": 'small-centered'
    });
    title.append("<h5>" + challenge.competition_name + "</h5>");
    card.append(img);
    card.append(title);
    col.append(card);
    return col;
}
