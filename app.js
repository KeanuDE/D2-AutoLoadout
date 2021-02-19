/*
*   Link type: oAuth Link
*   link: https://www.bungie.net/en/oauth/authorize?response_type=code&client_id=35548
*/

function getQueries() {
    var queryDict = {}
    location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})
    return queryDict;
}
var apiKey = "5c48d29c9ee04b5e8f4bb13377fa8101";

async function getToken() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST","https://www.bungie.net/platform/app/oauth/token/")
    xhr.setRequestHeader("X-API-Key", apiKey);
    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
         var json = JSON.parse(this.responseText);
         return json;
        } else {
            return this.status;
        }
    }
    xhr.send("grant_type=authorization_code&code=" + getQueries().code);
}

if(getQueries().code == undefined) {
    $("#login").css('display',"block");
} else {
    $("#login").css('display',"none");
    console.log(getToken());
}