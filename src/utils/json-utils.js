export function processWeather(data) {
    const sanitizeData = data.days.slice(0, 7)

    const transformedData = {
        
        location: data.resolvedAddress,
        currentDay: {
            location : data.resolvedAddress,
            temperature: sanitizeData[0].temp,
            description: sanitizeData[0].conditions,
            maxTemperature: sanitizeData[0].tempmax,
            minTemperature: sanitizeData[0].tempmin,
            feelsLike: sanitizeData[0].feelslike,
            uvIndex: sanitizeData[0].uvindex,
            precipitationProbability: sanitizeData[0].precipprob,
            sunrise: sanitizeData[0].sunrise,
            sunset: sanitizeData[0].sunset,
        },
        secondDay: {
            date: sanitizeData[1].datetime,
            temperature: sanitizeData[1].temp,
            description: sanitizeData[1].conditions,
            maxTemperature: sanitizeData[1].tempmax,
            minTemperature: sanitizeData[1].tempmin,
        },
        thirdDay: {
            date: sanitizeData[2].datetime,
            temperature: sanitizeData[2].temp,
            description: sanitizeData[2].conditions,
            maxTemperature: sanitizeData[2].tempmax,
            minTemperature: sanitizeData[2].tempmin
        },
        fourthDay: {
            date: sanitizeData[3].datetime,
            temperature: sanitizeData[3].temp,
            description: sanitizeData[3].conditions,
            maxTemperature: sanitizeData[3].tempmax,
            minTemperature: sanitizeData[3].tempmin
        },
        fifthDay: {
            date: sanitizeData[4].datetime,
            temperature: sanitizeData[4].temp,
            description: sanitizeData[4].conditions,
            maxTemperature: sanitizeData[4].tempmax,
            minTemperature: sanitizeData[4].tempmin
        },
        sixthDay: {
            date: sanitizeData[5].datetime,
            temperature: sanitizeData[5].temp,
            description: sanitizeData[5].conditions,
            maxTemperature: sanitizeData[5].tempmax,
            minTemperature: sanitizeData[5].tempmin
        },
        seventhDay: {
            date: sanitizeData[6].datetime,
            temperature: sanitizeData[6].temp,
            description: sanitizeData[6].conditions,
            maxTemperature: sanitizeData[6].tempmax,
            minTemperature: sanitizeData[6].tempmin
        },

    };

    return transformedData;
}


