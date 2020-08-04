import axios from "axios";
import { Request, Response } from "express";
import authorizeToken from "../middleware/authorizeToken";

export default (app: any) => {
  app.post(
    "/api/searchsongs",
    authorizeToken,
    async (req: Request, res: Response) => {
      try {
        const searchTerm = req.body.search;
        const headers = {
          Authorization: "Bearer " + req.body.access_token,
        };

        const response = await axios.get(
          `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
          { headers }
        );

        console.log(response.data.tracks.items);

        const tracks = response.data.tracks.items;

        const track_ids = tracks.map((track: any) => track.id);

        const track_ids_formatted = track_ids.join();

        const afresponse = await axios.get(
          `https://api.spotify.com/v1/audio-features`,
          {
            params: { ids: track_ids_formatted },
            headers: { Authorization: "Bearer " + req.body.access_token },
          }
        );
        const audioFeatures = afresponse.data;
        console.log(audioFeatures);

        const tracksWithAudioFeatures = tracks.map((track: any) => {
          const af = audioFeatures.audio_features.find(
            (audio_f: any) => audio_f.id === track.id
          );
          return {
            ...track,
            audio_feature: af,
          };
        });

        res.status(200).send(tracksWithAudioFeatures);
      } catch (err) {
        res.status(400).send(err);
        console.log(err);
      }
    }
  );

  app.post(
    "/api/audiofeatures",
    authorizeToken,
    async (req: Request, res: Response) => {
      try {
        const track_ids_array = req.body.track_ids;
        const track_ids = track_ids_array.join();

        const headers = {
          Authorization: "Bearer " + req.body.access_token,
        };

        const response = await axios.get(
          `https://api.spotify.com/v1/audio-features`,
          {
            params: { ids: track_ids },
            headers: { Authorization: "Bearer " + req.body.access_token },
          }
        );

        console.log(response.data);

        res.status(200).send(response.data);
      } catch (err) {
        res.status(400).send(err);
        console.log(err);
      }
    }
  );
};
