// creates a button to clear local storage
document.getElementById('clearButton').addEventListener('click', function() {
    localStorage.clear();
    alert('Search history has been cleared. Refresh the page.');
});

var currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=[apikey]';

    $.ajax({
      url: currentWeatherURL,
      method: 'GET'
    }).then(function(response) {
      // Display current weather conditions
      var currentWeather = $('#current-weather');
      currentWeather.empty();

      var cityName = $('<h2>').text(response.name);
      var date = dayjs();$('<h4>').text(date.format('MMM D YYYY'));
      var icon = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png');
      var temperature = $('<p>').text('Temperature: ' + response.main.temp + ' °F');
      var humidity = $('<p>').text('Humidity: ' + response.main.humidity + '%');
      var windSpeed = $('<p>').text('Wind Speed: ' + response.wind.speed + ' MPH');

      currentWeather.append(cityName, date, icon, temperature, humidity, windSpeed);
    });