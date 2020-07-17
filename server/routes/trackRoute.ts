import axios from "axios";
import { Request, Response } from "express";
import { access_token } from "./authRoute";

export default (app: any) => {
  app.post("/api/searchsongs", async (req: Request, res: Response) => {
    try {
      const searchTerm = req.body.search;
      const headers = {
        Authorization: "Bearer " + access_token,
      };

      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
        { headers }
      );

      console.log(response.data.tracks.items);

      res.status(200).send(response.data.tracks.items);
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  });

  app.post("/api/audiofeatures", async (req: Request, res: Response) => {
    try {
      const track_ids_array = req.body.track_ids;
      const track_ids = track_ids_array.join();

      const headers = {
        Authorization: "Bearer " + access_token,
      };

      const response = await axios.get(
        `https://api.spotify.com/v1/audio-features`,
        {
          params: { ids: track_ids },
          headers: { Authorization: "Bearer " + access_token },
        }
      );

      console.log(response.data);

      res.status(200).send(response.data);
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  });
};
