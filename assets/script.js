var apiKey= "7b52d063c16449508ca9fa904c38120e";
var searchBtn = document.querySelector("#search-button");

function searchValue () {
    var searchValue = document.querySelector("#search-value").value;
    console.log(searchValue);
    getCurrentWeather(searchValue);
}


function getCurrentWeather(searchValue) {
 var queryUrl= "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid" + apiKey;


 fetch(queryUrl)
 .then(function(res) {
     return res.json()
 })
 .then(function(data) {
    console.log(data); 
    //Append conten to the DOM
    // Todo call forecast and UV Index
 })
}



searchBtn.addEventListener("click", searchValue);