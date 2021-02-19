/*
*   Link type: oAuth Link
*   link: https://www.bungie.net/en/oauth/authorize?response_type=code&client_id=35548
*/

function getQueries() {
    var queryDict = {}
    location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})
    return queryDict;
}

async function getToken() {
    var details = {
        'grant_type': 'authorization_code',
        'code': String(getQueries().code)
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    const response = await fetch("https://www.bungie.net/platform/app/oauth/token/", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-Key': "5c48d29c9ee04b5e8f4bb13377fa8101"
        },
        body: formBody
    });
    return response;
}

if(getQueries().code == undefined) {
    $("#login").css('display',"block");
} else {
    $("#login").css('display',"none");
    console.log(getToken());
}