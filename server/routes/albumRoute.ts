import axios from "axios";
import { Request, Response } from "express";
import audiofeature from "../helpers/audiofeature";
import authorizeToken from "../middleware/authorizeToken";

export default (app: any) => {
  app.post(
    "/api/searchalbums",
    authorizeToken,
    async (req: Request, res: Response) => {
      try {
        const searchTerm = req.body.search;

        const response = await axios.get(
          `https://api.spotify.com/v1/search?q=${searchTerm}&type=album`,
          {
            headers: {
              Authorization: "Bearer " + req.body.access_token,
            },
          }
        );
        const albums = response.data.albums.items;

        res.status(200).send(albums);
      } catch (err) {
        res.status(400).send(err);
        console.log(err);
      }
    }
  );

  app.post(
    "/api/searchalbumtracks",
    authorizeToken,
    async (req: Request, res: Response) => {
      try {
        const album_id = req.body.albumid;

        const response = await axios.get(
          `https://api.spotify.com/v1/albums/${album_id}/tracks`,
          {
            headers: {
              Authorization: "Bearer " + req.body.access_token,
            },
          }
        );

        const tracks = response.data.items;

        const tracksWithAudioFeatures = await audiofeature(
          tracks,
          req.body.access_token
        );

        res.status(200).send(tracksWithAudioFeatures);
      } catch (err) {
        res.status(400).send(err);
        console.log(err);
      }
    }
  );
};
