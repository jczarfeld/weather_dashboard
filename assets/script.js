var apiKey = "9da4bb573ba9574c53ffbc53979faaa4"
var keyTwo = "52c899606f29b603884878106302fb01"
var searchBtn = document.querySelector("#search-button");
var citiesList = document.querySelector("#cities-list");
var resultContentEl = document.querySelector('#result-content');
var resultText = document.querySelector("#result-text");


function printResults(data2) {
  //  resultObj.preventDefault();
    console.log(data2);

    // set up `<div>` to hold result content
    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);

    var titleEl = document.createElement('h3');
    titleEl.textContent = data2.timezone;

    var bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML =
        '<strong>Date:</strong> ' + data2.lat + '<br/>';

 //   if (resultObj.subject) {
  //      bodyContentEl.innerHTML +=
 //           '<strong>Subjects:</strong> ' + data2.current.join(', ') + '<br/>';
 //   } else {
//        bodyContentEl.innerHTML +=
//            '<strong>Subjects:</strong> No subject for this entry.';
 //   }

 //   if (resultObj.description) {
 //       bodyContentEl.innerHTML +=
 //          '<strong>Description:</strong> ' + data2.timezone_offset;
 //   } else {
  //      bodyContentEl.innerHTML +=
  //          '<strong>Description:</strong>  No description for this entry.';
 //   }

    var linkButtonEl = document.createElement('a');
    linkButtonEl.textContent = 'Read More';
    linkButtonEl.setAttribute('href', data2.url);
    linkButtonEl.classList.add('btn', 'btn-dark');

    resultBody.append(titleEl, bodyContentEl, linkButtonEl);

    resultContentEl.append(resultCard);
}


function searchValue(event) {

    event.preventDefault();
    var searchedCity = document.querySelector("#search-value").value;
    console.log(searchedCity);
    var listedCity = $('<button type="submit" id="search-button" class="btn">');
    listedCity.text(searchedCity);
    listedCity.appendTo(citiesList);

    getCurrentWeather(searchedCity);
}


function getCurrentWeather(searchedCity) {
  //  searchValue.preventDefault();
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


                // this is to make the new api call. maybe i need to make a whole new funcion for this.

                var oneClickUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + keyTwo;
                fetch(oneClickUrl)
                    .then(function (res) {
                    //    res.preventDefault();
                     //  if (!res.ok) {
                      //      throw res.json();
                      //  }

                        return res.json();
                    })
                    .then(function (data2) {
                      //  data2.preventDefault();
                     //   resultText.textContent = data2.search.query;

                        console.log(data2);


                    //  if (!data2.length) {
                     //       console.log("No results found!");
                     //       resultContentEl.innerHTML = '<h3>No results found, try again!</h3>';
                     //   } else {
                      //      resultContentEl.textContent = '';
                     //    for (var i = 0; i < data2.length; i++) {
                                printResults(data2);
                           })
                        
                    







                    }



                // trying to make a new card with the results of the second api call



                //Append conten to the DOM
                // Todo call forecast and UV Index
         ) }
        
    



searchBtn.addEventListener("click", searchValue);