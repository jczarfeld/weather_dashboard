var apiKey= "9da4bb573ba9574c53ffbc53979faaa4"
var searchBtn = document.querySelector("#search-button");
var citiesList = document.querySelector("#cities-list");


function searchValue (event) {
   
   event.preventDefault();
    var searchValue = document.querySelector("#search-value").value;
    console.log(searchValue);
    var listedCity = $('<button type="submit" id="search-button" class="btn">');
    listedCity.text(searchValue);
    listedCity.appendTo(citiesList);

    getCurrentWeather(searchValue);
}


function getCurrentWeather(searchValue) {
 var queryUrl= "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey;


 fetch(queryUrl)
 .then(function(res) {
     return res.json()
 })
 .then(function(data) {
    console.log(data); 
    console.log(data.coord);
    //Append conten to the DOM
    // Todo call forecast and UV Index
 })
}



searchBtn.addEventListener("click", searchValue);