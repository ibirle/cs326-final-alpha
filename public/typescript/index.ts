/**let url = require('url');

function getChallenge(){
    let challengeName = document.getElementById().value;
    const newUrl = url;
}**/


/*
Fills front page with current challenges
*/
$(document).ready(async function() {
    let challenges = await loadChallenges();
    let chals = separateChals(challenges);
    fillChallengesWeekly(chals[0]);
    fillChallengesDaily(chals[1]);
})



async function loadChallenges() {
    let response = await fetch('/api/getAllCurrentChallenges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({}),
    });
    return response.json();

}

/*
Separates the loaded challenges into daily and weekly challenges for function calls
*/
function separateChals(challenges) {
    let weeklies = new Array();
    let dailies = new Array();
    for (let i=0; i < challenges.rows.length; i++) {
        if (challenges.rows[i]["competition_type"] === "weekly") {
            weeklies.push(challenges.rows[i]);
        }
        else {
            dailies.push(challenges.rows[i]);
        }
    }
    return([weeklies, dailies])
}

function fillChallengesWeekly(challenges) {
    for (let i = 0; i < challenges.length; i++) {
        $("#weekly").append(        '<div onClick="openLink(\'' + challenges[i].competition_ID + '\')" id="weeklyCard" class="card">' +
                                        "<img src='" + challenges[i].cover_link + "' class='card-img img-fluid wide-img-card' alt='Picture of bread'>" +
                                        "<div class='centered'>" +
                                            "<h5>" + challenges[i].competition_name + "</h5>" +
                                        "</div>" +
                                    "</div>");
    }
}

function openLink(competition_ID) {
    let userID = $("#userIDSelect option:selected").attr("userID");
    window.location.href=("/challenge_page.html?challengeID=" + competition_ID + "&userID=" + userID);
}

function fillChallengesDaily(challenges) {
    let row = $("#daily-cards-row");
    let c;
    for(c of challenges){
        let cardCol = createDailyCard(c);
        row.append(cardCol);
    }
}

function createDailyCard(challenge): JQuery<HTMLElement>{
    let col = $('<div/>', {
        "class": 'col-sm-12 col-md-6 col-lg-4'
    });

    let link = $('<a/>', {
        "href": '/challenge_page.html?challengeID='+challenge.competition_ID,
        "class": "text-dark"
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

    title.append("<h5>"+ challenge.competition_name + "</h5>");
    card.append(img);
    card.append(title);
    link.append(card);
    col.append(link);
    return col;
}