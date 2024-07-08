const searchForm = document.querySelector('.search-container form');
const container1 = document.querySelector('#container1');
const container2 = document.querySelector('#container2');
const container3 = document.querySelector('#container3');
const container4 = document.querySelector('#container4');

if (searchForm) {
    searchForm.addEventListener('submit', handleSearchSubmit);
} else {
    console.error('Search form not found!');
}

async function handleSearchSubmit(event) {
    event.preventDefault();

    const searchInput = document.getElementById('searchTextField');
    const searchTerm = searchInput.value;
    if (!searchTerm) {
        alert('Please enter a search term.');
        return;
    }

    try {
        const response = await fetch(`/weather/${searchTerm}`);
        const data = await response.json();
        container1.innerHTML = `
        <h3 id="currentWeatherTitle">Weather in ${data.location}</h3>
        <p id="currentWeatherTemp">Temperature: ${data.currentDay.temperature}°C</p>
        <p id="currentWeatherDesc">Description: ${data.currentDay.description}</p>
        <p id="currentWeatherMaxTemp">Max Temperature: ${data.currentDay.maxTemperature}°C</p>
        <p id="currentWeatherMinTemp">Min Temperature: ${data.currentDay.minTemperature}°C</p>
      `;
    
        container2.innerHTML = `
        <h3>Additional weather information for ${data.location}</h3>
        <p>UV Index: ${data.currentDay.uvIndex}</p>
        <p>Precipitation Probability: ${data.currentDay.precipitationProbability}%</p>
        <p>Sunrise: ${data.currentDay.sunrise}</p>
        <p>Sunset: ${data.currentDay.sunset}</p>
        `;
        
        container3.innerHTML = `
        <h3>Weather for next 3 days in ${data.location}</h3>
        <p>Date: ${data.secondDay.date}
        <p>Temperature: ${data.secondDay.temperature}°C</p>
        <p>Description: ${data.secondDay.description}</p>
        <p>Max Temperature: ${data.secondDay.maxTemperature}°C</p>
        <p>Min Temperature: ${data.secondDay.minTemperature}°C</p>
        <hr class="my-2 border-white">
        <p>Date: ${data.thirdDay.date}
        <p>Temperature: ${data.thirdDay.temperature}°C</p>
        <p>Description: ${data.thirdDay.description}</p>
        <p>Max Temperature: ${data.thirdDay.maxTemperature}°C</p>
        <p>Min Temperature: ${data.thirdDay.minTemperature}°C</p>
        <hr class="my-2 border-white">
        <p>Date: ${data.fourthDay.date}<p>
        <p>Temperature: ${data.fourthDay.temperature}°C</p>
        <p>Description: ${data.fourthDay.description}</p>
        <p>Max Temperature: ${data.fourthDay.maxTemperature}°C</p>
        <p>Min Temperature: ${data.fourthDay.minTemperature}°C</p>
      `;
    
        container4.innerHTML = `
        <h3 id="currentWeatherId">Weather for next additional days in ${data.location}</h3>
        <p>Date: ${data.fifthDay.date}<p>
        <p>Temperature: ${data.fifthDay.temperature}°C</p>
        <p>Description: ${data.fifthDay.description}</p>
        <p>Max Temperature: ${data.fifthDay.maxTemperature}°C</p>
        <p>Min Temperature: ${data.fifthDay.minTemperature}°C</p>
        <hr class="my-2 border-white">
        <p>Date: ${data.sixthDay.date}
        <p>Temperature: ${data.sixthDay.temperature}°C</p>
        <p>Description: ${data.sixthDay.description}</p>
        <p>Max Temperature: ${data.sixthDay.maxTemperature}°C</p>
        <p>Min Temperature: ${data.sixthDay.minTemperature}°C</p>
        <hr class="my-2 border-white">
        <p>Date: ${data.seventhDay.date}
        <p>Temperature: ${data.seventhDay.temperature}°C</p>
        <p>Description: ${data.seventhDay.description}</p>
        <p>Max Temperature: ${data.seventhDay.maxTemperature}°C</p>
        <p>Min Temperature: ${data.seventhDay.minTemperature}°C</p>
    `;
    manageContainersBasedOnAuth();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('Error fetching weather data. Please try again later.');
    }

}

async function getUserCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                try {
                    const userLocation = `coords:${latitude},${longitude}`
                    const response = await fetch(`/weather/${userLocation}`);
                    const data = await response.json();

                    const locationObj = await convertCoordsToLocation(data.currentDay.location)
                    const county = locationObj.address.county
                    const country = locationObj.address.country

                    container1.innerHTML = `
                    <h3 id="currentWeatherTitle">Weather in ${county},${country}</h3>
                    <p id="currentWeatherTemp">Temperature: ${data.currentDay.temperature}°C</p>
                    <p id="currentWeatherDesc">Description: ${data.currentDay.description}</p>
                    <p id="currentWeatherMaxTemp">Max Temperature: ${data.currentDay.maxTemperature}°C</p>
                    <p id="currentWeatherMinTemp">Min Temperature: ${data.currentDay.minTemperature}°C</p>
                  `;
                
                    container2.innerHTML = `
                    <h3 id="currentWeatherTitleTwo">Additional weather information for ${county},${country}</h3>
                    <p id="currentWeatherUV">UV Index: ${data.currentDay.uvIndex} out of 10</p>
                    <p id="currentWeatherPrecipitation">Precipitation Probability: ${data.currentDay.precipitationProbability}%</p>
                    <p id="currentWeatherSunrise">Sunrise: ${data.currentDay.sunrise}</p>
                    <p id="currentWeahterSunset">Sunset: ${data.currentDay.sunset}</p>
                    `;
                    
                    container3.innerHTML = `
                    <h3 id="secondDayTitle">Weather for next 3 days in ${county},${country}</h3>
                    <p id="secondDayDate">Date: ${data.secondDay.date}
                    <p id="secondDayTemperature">Temperature: ${data.secondDay.temperature}°C</p>
                    <p id="secondDayDescription">Description: ${data.secondDay.description}</p>
                    <p id="secondDayMaxTemperature">Max Temperature: ${data.secondDay.maxTemperature}°C</p>
                    <p id="secondDayMinTemperature">Min Temperature: ${data.secondDay.minTemperature}°C</p>
                    <hr class="my-2 border-white">
                    <p id="thirdDayDate">Date: ${data.thirdDay.date}
                    <p id="thirdDayTemperature">Temperature: ${data.thirdDay.temperature}°C</p>
                    <p id="thirdDayDescription">Description: ${data.thirdDay.description}</p>
                    <p id="thirdDayMaxTemperature">Max Temperature: ${data.thirdDay.maxTemperature}°C</p>
                    <p id="thirdDayMinTemperature">Min Temperature: ${data.thirdDay.minTemperature}°C</p>
                    <hr class="my-2 border-white">
                    <p id="fourthDayDate">Date: ${data.fourthDay.date}<p>
                    <p id="fourthDayTemperature">Temperature: ${data.fourthDay.temperature}°C</p>
                    <p id="fourthDayDescription">Description: ${data.fourthDay.description}</p>
                    <p id="fourthDayMaxTemperature">Max Temperature: ${data.fourthDay.maxTemperature}°C</p>
                    <p id="fourthDayMinTemperature">Min Temperature: ${data.fourthDay.minTemperature}°C</p>
                  `;
                
                    container4.innerHTML = `
                    <h3 id="dayFifthTitle">Weather for next additional days in ${county},${country}</h3>
                    <p id="dayFifthDate">Date: ${data.fifthDay.date}<p>
                    <p id="dayFifthTemperature">Temperature: ${data.fifthDay.temperature}°C</p>
                    <p id="dayFifthDescription">Description: ${data.fifthDay.description}</p>
                    <p id="dayFifthMaxTemperature">Max Temperature: ${data.fifthDay.maxTemperature}°C</p>
                    <p id="dayFifthMinTemperature">Min Temperature: ${data.fifthDay.minTemperature}°C</p>
                    <hr class="my-2 border-white">
                    <p id="daySixthDate">Date: ${data.sixthDay.date}
                    <p id="daySixthTemperature">Temperature: ${data.sixthDay.temperature}°C</p>
                    <p id="daySixthDescription">Description: ${data.sixthDay.description}</p>
                    <p id="daySixthMaxTemperature">Max Temperature: ${data.sixthDay.maxTemperature}°C</p>
                    <p id="daySixthMinTemperature">Min Temperature: ${data.sixthDay.minTemperature}°C</p>
                    <hr class="my-2 border-white">
                    <p id="daySeventhDate">Date: ${data.seventhDay.date}
                    <p id="daySeventhTemperature">Temperature: ${data.seventhDay.temperature}°C</p>
                    <p id="daySeventhDescription">Description: ${data.seventhDay.description}</p>
                    <p id="daySeventhMaxTemperature">Max Temperature: ${data.seventhDay.maxTemperature}°C</p>
                    <p id="daySeventhMinTemperature">Min Temperature: ${data.seventhDay.minTemperature}°C</p>
                `;

                manageContainersBasedOnAuth();
                }catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                    alert('Error fetching weather data. Please try again later.');
                }

            },
            (error) => {
                console.error('Geolocation error:', error);
                alert('Error getting your current location. Please try again later.');
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
        alert('Your browser does not support geolocation.');
    }
};

async function convertCoordsToLocation (coordinates) {

    const response = await fetch(`/coordinates/${coordinates}`)
    const data = await response.json();
    return data

};

window.addEventListener('DOMContentLoaded', getUserCurrentLocation);

