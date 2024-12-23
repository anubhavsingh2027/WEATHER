async function getWeather() {
  const city = document.getElementById('city').value.trim();
  const apiKey = '53f765c24cc068e9215e8f8bc3ed66d1'; // Replace with your OpenWeatherMap API key

  if (!city) {
      alert('Please enter a city name.');
      return;
  }

  try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      displayWeather(data);
  } catch (error) {
      alert('Error: ' + error.message);
      clearWeatherInfo();
  }
}

function displayWeather(data) {
  document.getElementById('city-name').textContent = data.name;
  document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
  document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  const weatherInfo = document.getElementById('weather-info');
  weatherInfo.classList.remove('hidden');
  weatherInfo.style.opacity = 1;
  weatherInfo.style.transform = 'translateY(0)';
}

function clearWeatherInfo() {
  document.getElementById('weather-info').classList.add('hidden');
  document.getElementById('weather-info').style.opacity = 0;
  document.getElementById('weather-info').style.transform = 'translateY(20px)';
}
