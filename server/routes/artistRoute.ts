import axios from 'axios';
import { Request, Response } from 'express';
import audiofeature from '../helpers/audiofeature';
import authorizeToken from '../middleware/authorizeToken';

export default (app: any) => {
    app.post('/api/searchartists', authorizeToken, async (req: Request, res: Response) => {
        try {
            const searchTerm = req.body.search;
            const headers = {
                Authorization: 'Bearer ' + req.body.access_token,
            };

            const response = await axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`, {
                headers,
            });
            console.log(response.data.artists.items);

            res.status(200).send(response.data.artists.items);
        } catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    });

    //https://stackoverflow.com/questions/40020946/how-to-get-all-songs-of-an-artist-on-spoitfy

    app.post('/api/allartisttracks', authorizeToken, async (req: Request, res: Response) => {
        try {
            const searchTerm = req.body.search;

            const response = await axios.get(`https://api.spotify.com/v1/search?type=track&q=artist:${searchTerm}`, {
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
