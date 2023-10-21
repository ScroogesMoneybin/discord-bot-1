const axios = require('axios');

const URL = 'https://api.weatherapi.com/v1/forecast.json';
const FORECAST_DAYS = 3;

const fetchForecast = async (location) => {
    return await axios({
        url: URL,
        method: 'get',
        params: {
            q: location,
            days: FORECAST_DAYS,
            key: process.env.WEATHER_API_KEY
        },
        responseType: 'json'

    }).then(res=>{
        const city = res.data.location.name;
        const country = res.data.location.country;
        const locationName = `${city}, ${country}`;

        const weatherData = res.data.forecast.forecastday.map(forecastDay=> {
            //returns an array of objects
            return {
                //weather info
                date: forecastDay.date,
                tempMinC: forecastDay.day.mintemp_c,
                tempMaxC: forecastDay.day.maxtemp_c,
                tempMinF: forecastDay.day.mintemp_f,
                tempMaxF: forecastDay.day.maxtemp_f,

                //sunrise and sunset
                sunriseTime: forecastDay.astro.sunrise,
                sunsetTime: forecastDay.astro.sunset,
                moonriseTime: forecastDay.astro.moonrise,
                moonsetTime: forecastDay.astro.moonset,
            }
        })
        return {
            locationName,
            weatherData
        }
    }).catch(err => {
        console.error(err)
        throw new Error(`Error fetching weather for ${locationName}`)
    })
}

module.exports = {
    fetchForecast 
}