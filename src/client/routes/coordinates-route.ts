import express, { Request, Response } from 'express';
import axios from 'axios';
import { COORDS_API_KEY} from '../config/config';
const router = express.Router();

router.get('/:coordinates', async (req: Request, res: Response) => {

    let coordinates = req.params.coordinates;

    const splitCoords = coordinates.split(",");
    const latitude = splitCoords[0];
    const longitude = splitCoords[1];

    const apiUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${COORDS_API_KEY}`;  
    try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error(`"Unable to geocode":${latitude},${longitude}`, error);
        res.status(500).json({ error: 'Error geocoding coordinates. Please try again later.' });
    }
});

export default router;