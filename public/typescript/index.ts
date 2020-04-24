/**let url = require('url');

function getChallenge(){
    let challengeName = document.getElementById().value;
    const newUrl = url;
}**/



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

}

function fillChallengesDaily(challenges) {

}