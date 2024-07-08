import express, { Request, Response } from 'express';
import axios from 'axios';
import { WEATHER_API_KEY } from '../config/config';
import { processWeather } from '../../utils/json-utils'; 
const router = express.Router();

router.get('/:location', async (req: Request, res: Response) => {
    let location = req.params.location;

    if (location.includes("coords:")){
        const regex = /^coords:(.+)$/;
        const match = location.match(regex);
        if (match){
            location = match[1];
        }
    }

    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${WEATHER_API_KEY}`;  
    
    try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        const transformedData = processWeather(data);

        res.json(transformedData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Error fetching weather data. Please try again later.' });
    }
});

export default router;