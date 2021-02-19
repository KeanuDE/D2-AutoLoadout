/*
*   Link type: oAuth Link
*   link: https://www.bungie.net/en/oauth/authorize?response_type=code&client_id=35548
*/

function getQueries() {
    var queryDict = {}
    location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})
    return queryDict;
}
let apiKey = "5c48d29c9ee04b5e8f4bb13377fa8101";
async function getToken() {
    $.ajax({
        url: "https://www.bungie.net/platform/Destiny/Manifest/InventoryItem/1274330687/",
        headers: {
         "X-API-Key": apiKey
        }
    }).done(function(json){
        return json.Response.data.inventoryItem.itemName; //Gjallarhorn
    });
}

if(getQueries().code == undefined) {
    $("#login").css('display',"block");
} else {
    $("#login").css('display',"none");
    console.log(getToken());
}