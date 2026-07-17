// Weather Service
// Provides weather information for destinations

const getWeatherData = (destination) => {
  const weatherDatabase = {
    'Goa': {
      temperature: '28-32°C',
      condition: 'Tropical',
      forecast: 'Sunny with occasional showers',
      humidity: '75-85%',
      windSpeed: '15-20 km/h'
    },
    'Manali': {
      temperature: '10-20°C',
      condition: 'Cool and pleasant',
      forecast: 'Clear skies with cool breeze',
      humidity: '50-60%',
      windSpeed: '10-15 km/h'
    },
    'Kashmir': {
      temperature: '5-15°C',
      condition: 'Mild',
      forecast: 'Partly cloudy',
      humidity: '60-70%',
      windSpeed: '12-18 km/h'
    },
    'Jaipur': {
      temperature: '25-35°C',
      condition: 'Hot and dry',
      forecast: 'Sunny throughout the day',
      humidity: '30-40%',
      windSpeed: '10-15 km/h'
    },
    'Kerala': {
      temperature: '25-30°C',
      condition: 'Tropical',
      forecast: 'Humid with occasional rain',
      humidity: '80-90%',
      windSpeed: '15-25 km/h'
    },
    'Leh Ladakh': {
      temperature: '0-15°C',
      condition: 'Cold and dry',
      forecast: 'Clear days, cold nights',
      humidity: '20-30%',
      windSpeed: '20-30 km/h'
    }
  };

  return weatherDatabase[destination] || {
    temperature: '20-25°C',
    condition: 'Pleasant',
    forecast: 'Generally clear',
    humidity: '50-60%',
    windSpeed: '10-15 km/h'
  };
};

const getWeatherForecast = (destination, days = 7) => {
  const baseWeather = getWeatherData(destination);
  const forecast = [];

  for (let i = 1; i <= days; i++) {
    forecast.push({
      day: i,
      condition: baseWeather.condition,
      temperature: baseWeather.temperature,
      humidity: baseWeather.humidity,
      windSpeed: baseWeather.windSpeed,
      precipitation: Math.floor(Math.random() * 30)
    });
  }

  return forecast;
};

module.exports = {
  getWeatherData,
  getWeatherForecast
};
