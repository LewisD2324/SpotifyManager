import axios from 'axios';
import { Request, Response } from 'express';
import authorizeToken from '../middleware/authorizeToken';
import audiofeature from '../helpers/audiofeature';
export default (app: any) => {
    app.post('/api/searchsongs', authorizeToken, async (req: Request, res: Response) => {
        try {
            const searchTerm = req.body.search;

            const response = await axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
                headers: {
                    Authorization: 'Bearer ' + req.body.access_token,
                },
            });

            const tracks = response.data.tracks.items;

            const tracksWithAudioFeatures = await audiofeature(tracks, req.body.access_token);

            res.status(200).send(tracksWithAudioFeatures);
        } catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    });
};
