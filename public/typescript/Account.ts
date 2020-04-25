$(document).ready(async function() {
    let account = await getAccount();
})

async function getAccount() {
    let response = await fetch('/api/getAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({}),
    });
    return response.json();

}