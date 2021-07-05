var apiKey = "9da4bb573ba9574c53ffbc53979faaa4"
var keyTwo = "52c899606f29b603884878106302fb01"
var searchBtn = document.querySelector("#search-button");
var citiesList = document.querySelector("#cities-list");
var resultContentEl = document.querySelector('#result-content');
var resultText = document.querySelector("#result-text");
var cityHead = document.querySelector("#city-head");
var cityBtn = document.querySelector("#city-button");


function printResults(data2) {
  //  resultObj.preventDefault();
  console.log(data2);

  // set up `<div>` to hold result content for daily weather
  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'mb-3', 'p-3');

  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var tempContentEl = document.createElement('p');
  tempContentEl.innerHTML =
    '<strong>Current Temp: </strong> ' + data2.current.temp + ' deg F<br/>';

  var windContentEl = document.createElement('p');
  windContentEl.innerHTML =
    '<strong>Current Wind Speed: </strong> ' + data2.current.wind_speed + ' mph<br/>';

  var humidityContentEl = document.createElement('p');
  humidityContentEl.innerHTML =
    '<strong>Current Humidity: </strong> ' + data2.current.humidity + '%<br/>';

  var UVContentEl = document.createElement('p');
  UVContentEl.innerHTML =
    '<strong>UV Index: </strong> ' + data2.current.uvi + '<br/>';


  resultBody.append(tempContentEl, windContentEl, humidityContentEl, UVContentEl);


//attached below the daily weather is a row of 5 day forecasts with various projections


  var fiveDayRow = document.createElement('div');
  fiveDayRow.classList.add('flex-row');
  fiveDayRow.classList.add('five-row');
  resultCard.append(fiveDayRow);

  var dayOneCol = document.createElement('div');
  dayOneCol.classList.add('col-2')
  dayOneCol.classList.add('day-col')
  dayOneCol.innerHTML =
    '<p><strong>Tomorrow:</strong> <br/>' + data2.daily[1].weather[0].description + '<br/> <strong>Moonset: </strong>' + data2.daily[1].moonset + '<br/> <strong>Wind Gust: </strong>' + data2.daily[1].wind_gust + ' mph<br/> <strong>PoP12: </strong>' + data2.daily[1].pop + '%<br/></p>';

  var dayTwoCol = document.createElement('div');
  dayTwoCol.classList.add('col-2')
  dayTwoCol.classList.add('day-col')
  dayTwoCol.innerHTML =
    '<p><strong>Day Two:</strong> <br/> ' + data2.daily[2].weather[0].description + '<br/> <strong>Moonset: </strong>' + data2.daily[2].moonset + '<br/> <strong>Wind Gust: </strong>' + data2.daily[2].wind_gust + ' mph<br/> <strong>PoP12: </strong>' + data2.daily[2].pop + '%<br/></p>';


  var dayThreeCol = document.createElement('div');
  dayThreeCol.classList.add('col-2')
  dayThreeCol.classList.add('day-col')
  dayThreeCol.innerHTML =
    '<p><strong>Day Three:</strong>  <br/>' + data2.daily[3].weather[0].description + '<br/> <strong>Moonset: </strong>' + data2.daily[3].moonset + '<br/> <strong>Wind Gust: </strong>' + data2.daily[3].wind_gust + ' mph<br/> <strong>PoP12: </strong>' + data2.daily[3].pop + '%<br/></p>';

  var dayFourCol = document.createElement('div');
  dayFourCol.classList.add('col-2')
  dayFourCol.classList.add('day-col')
  dayFourCol.innerHTML =
    '<p><strong>Day Four:</strong>  <br/>' + data2.daily[4].weather[0].description + '<br/> <strong>Moonset: </strong>' + data2.daily[4].moonset + '<br/> <strong>Wind Gust: </strong>' + data2.daily[4].wind_gust + ' mph<br/> <strong>PoP12: </strong>' + data2.daily[4].pop + '%<br/></p>';

  var dayFiveCol = document.createElement('div');
  dayFiveCol.classList.add('col-2')
  dayFiveCol.classList.add('day-col')
  dayFiveCol.innerHTML =
    '<p><strong>Day Five:</strong>  <br/>' + data2.daily[5].weather[0].description + '<br/> <strong>Moonset: </strong>' + data2.daily[5].moonset + '<br/> <strong>Wind Gust: </strong>' + data2.daily[5].wind_gust + ' mph<br/> <strong>PoP12: </strong>' + data2.daily[5].pop + '%<br/></p>';

  fiveDayRow.append(dayOneCol, dayTwoCol, dayThreeCol, dayFourCol, dayFiveCol);
  resultContentEl.append(resultCard);


// then combine the items into the row and add the row to the daily weather card

  resultBody.append(tempContentEl, windContentEl, humidityContentEl, UVContentEl);

  resultContentEl.append(resultCard);
}

// get the name of the city they typed and add it to a clickable button of their searched city
function searchValue(event) {

  event.preventDefault();
  var searchedCity = document.querySelector("#search-value").value;
  console.log(searchedCity);
  var listedCity = $('<button type="submit" id="city-button" class="btn">');
  listedCity.text(searchedCity);
  listedCity.appendTo(citiesList);

  var cityTitle = $('<button type="submit" id="city-button" class="btn">');
  cityTitle.text(searchedCity);
  cityTitle.appendTo(cityHead);

  getCurrentWeather(searchedCity);
}

// this takes the city name and adds it to the url to access the weather api
function getCurrentWeather(searchedCity) {

  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + apiKey;


  fetch(queryUrl)
    .then(function (res) {
      return res.json()
    })

    .then(function (data) {
        console.log(data);
        console.log(data.coord);
        console.log("longitude:" + data.coord.lon);
        console.log("latitude:" + data.coord.lat);


        // this is to make the new api call. we needed the coordinates from the first call to add to this address.

        var oneClickUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&units=imperial" + "&appid=" + keyTwo;
        fetch(oneClickUrl)
          .then(function (res) {


            return res.json();
          })
          .then(function (data2) {


            console.log(data2);

            printResults(data2);
          })

      }


    )
}
// this starts the event of getting the weather, but I cannot get it to perform the same function again for the previous cities button(s)
searchBtn.addEventListener("click", searchValue);
cityBtn.addEventListener("click", searchValue);