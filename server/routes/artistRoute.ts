import axios from "axios";
import { access_token } from "./authRoute";
import { Request, Response } from "express";

export default (app: any) => {
  app.post("/api/searchartists", async (req: Request, res: Response) => {
    //developer.spotify.com/documentation/web-api/reference/artists/get-artists-top-tracks/ -- need to do this one, use the other one for searchbox suggestions
    try {
      const searchTerm = req.body.search;
      const headers = {
        Authorization: "Bearer " + access_token,
      };

      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`,
        { headers }
      );
      console.log(response.data.artists.items);

      res.status(200).send(response.data.artists.items);
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  });

  //https://stackoverflow.com/questions/40020946/how-to-get-all-songs-of-an-artist-on-spoitfy

  app.post("/api/allartisttracks", async (req: Request, res: Response) => {
    // THIS IS TOP TRACKS
    try {
      const searchTerm = req.body.search;
      const headers = {
        Authorization: "Bearer " + access_token,
      };

      const response = await axios.get(
        `https://api.spotify.com/v1/search?type=track&q=artist:${searchTerm}`,
        { headers }
      );

      // response.data.items = response.data.tracks.items.map((item: any) => {
      //   return {
      //     track: item,
      //   };
      // });

      console.log(response.data.tracks.items);

      res.status(200).send(response.data.tracks.items);
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  });

  app.post("/api/artisttracks", async (req: Request, res: Response) => {
    // THIS IS TOP TRACKS
    try {
      const artistId = req.body.artistid;
      const headers = {
        Authorization: "Bearer " + access_token,
      };

      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`,
        { headers }
      );

      // response.data.items = response.data.tracks.items.map((item: any) => {
      //   return {
      //     track: item,
      //   };
      // });

      console.log(response.data.tracks);

      res.status(200).send(response.data.tracks);
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  });
};
