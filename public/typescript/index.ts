/**let url = require('url');

function getChallenge(){
    let challengeName = document.getElementById().value;
    const newUrl = url;
}**/



$(document).ready(async function() {
    let challenges = await loadChallenges();
    console.log(challenges);
    fillChallenges(challenges);

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

function fillChallenges(challenges) {

}