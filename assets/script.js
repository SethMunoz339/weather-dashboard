// $(document).ready(function() {
//   // Load search history from localStorage
  var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
 
  
  // Display search history
  function displaySearchHistory() {
    $('#search-history').empty();
    for (var i = 0; i < searchHistory.length; i++) {
      var li = $('<li>').addClass('list-group-item').text(searchHistory[i]);
      $('#search-history').append(li);
    }
  }

  displaySearchHistory();

  document.getElementById('clearButton').addEventListener('click', function() {
    localStorage.clear();
    alert('Search history has been cleared. Refresh the page.');
  });

  // Handle form submission
  $('#search-form').submit(function(event) {
    event.preventDefault();
    var city = $('#city-input').val().trim();

    if (city === '') {
      return;
    }

    // Clear input field
    $('#city-input').val('');

    // Add city to search history
    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    displaySearchHistory();

    // Fetch latitude and longitude  data of a city by name 
    var cityCallURL = 'http://api.openweathermap.org/geo/1.0/direct?q='+ city + '&appid=9f33769f96f0baebca5950ba5abe7d0f';

    fetch(cityCallURL)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
  
      var lat = data[0].lat
      var lon = data[0].lon
      console.log(lat)
      console.log(lon)

      var currentWeatherURL ='https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=9f33769f96f0baebca5950ba5abe7d0f'

      fetch(currentWeatherURL)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data)
      // Display current weather conditions
      for (var i = 0; i < data; i++) {
        // var currentWeather = data;
      var currentWeather = $('#current-weather');
      currentWeather.empty();

      // var cityName = $('<h2>').text(data.name);
      var cityName = data[0].name;
      var h2Element= document.createElement('h2');
      h2Element.textContent = cityName;
      currentWeather.appendChild(h2Element);
      // var date = dayjs();$('<h4>').text(date.format('MMM D YYYY'));
      // var icon = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + data.list.weather.icon + '.png');
      // var temperature = $('<p>').text('Temperature: ' + data.list.main.temp + ' °F');
      // var humidity = $('<p>').text('Humidity: ' + data.list.main.humidity + '%');
      // var windSpeed = $('<p>').text('Wind Speed: ' + data.list.wind.speed + ' MPH');

      // currentWeather.append(cityName, date, icon, temperature, humidity, windSpeed);
        };

    // Fetch 5-day forecast data
    var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=9f33769f96f0baebca5950ba5abe7d0f'
    
    fetch(forecastURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data[0])
      // Display forecast
      var forecast = $('#forecast');
      forecast.empty();

      var forecastTitle = $('<h3>').text('5-Day Forecast');
      forecast.append(forecastTitle);

      var forecastList = $('<div>').addClass('row');

      for (var i = 0; i < data.length; i++) {
        var forecastItem = data[i];

        if (forecastItem.dt_txt.indexOf('15:00:00') !== -1) {
          var col = $('<div>').addClass('col-md-2');
          var card = $('<div>').addClass('card bg-primary text-white');
          var cardBody = $('<div>').addClass('card-body p-2');

          var date = dayjs();$('<h5>').text(date.format('MMM D YYYY'));
          var icon = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + forecastItem.weather[0].icon + '.png');
          var temperature = $('<p>').text('Temp: ' + forecastItem.main.temp + ' °F');
          var humidity = $('<p>').text('Humidity: ' + forecastItem.main.humidity + '%');

          cardBody.append(date, icon, temperature, humidity);
          card.append(cardBody);
          col.append(card);
          forecastList.append(col);
        }
      }

      forecast.append(forecastList);
    });
  })})});

  // Handle search history click event
  $(document).on('click', '.list-group-item', function() {
    var city = $(this).text();
    $('#city-input').val(city);
    $('#search-form').submit();
  });

