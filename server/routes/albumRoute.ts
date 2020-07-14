import axios from "axios";
import { access_token } from "./authRoute";
import { Request, Response } from "express";

export default (app: any) => {
  app.post("/api/searchalbums", async (req: Request, res: Response) => {
    try {
      const searchTerm = req.body.search;
      const headers = {
        Authorization: "Bearer " + access_token,
      };

      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchTerm}&type=album`,
        { headers }
      );
      console.log(response.data.albums.items);

      res.status(200).send(response.data.albums.items);
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  });

  app.post("/api/searchalbumtracks", async (req: Request, res: Response) => {
    try {
      const album_id = req.body.albumid;
      const headers = {
        Authorization: "Bearer " + access_token,
      };

      const response = await axios.get(
        `https://api.spotify.com/v1/albums/${album_id}/tracks`,
        { headers }
      );
      console.log(response.data.items);

      res.status(200).send(response.data.items);
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  });
};
