import axios from "axios";
import { access_token } from "./authRoute";
import { Request, Response } from "express";

export default (app: any) => {
  app.post("/api/getplaylist", async (req: Request, res: Response) => {
    try {
      const userId = req.body.userId;
      const headers = {
        Authorization: "Bearer " + access_token,
      };

      const response = await axios.get(
        `https://api.spotify.com/v1/me/playlists`,
        { headers }
      );

      console.log(response.data.items);
      const userOwnedPlaylists = response.data.items.filter(
        (item: any) => item.owner.id === userId
      );

      res.status(200).send(userOwnedPlaylists);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.post("/api/addtoplaylist", async (req: Request, res: Response) => {
    try {
      const playlist_id = req.body.playlist_id;

      const track = req.body.track;
      console.log(playlist_id, track);

      const response = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${track}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + access_token,
            Accept: "application/json",
            "content-type": "application/json",
          },
        }
      );

      console.log(response.data);

      res.status(200).send(response.data);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });

  app.post("/api/playlisttracks", async (req: Request, res: Response) => {
    try {
      const playlist_id = req.body.playlist_id;
      const totaltracks = req.body.totaltracks;

      console.log(playlist_id);
      console.log(totaltracks);
      var playlisttracks: any[] = [];
      for (var i = 0; i < totaltracks; i += 100) {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?offset=${i}&limit=100`,
          {
            headers: {
              Authorization: "Bearer " + access_token,
              Accept: "application/json",
              "content-type": "application/json",
            },
          }
        );

        response.data.items.map((x: any) => {
          playlisttracks.push(x.track);
        });
      }

      console.log(playlisttracks);

      res.status(200).send(playlisttracks);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });

  app.post("/api/removefromplaylist", async (req: Request, res: Response) => {
    try {
      const playlist_id = req.body.playlist_id;
      console.log(playlist_id);
      const headers = {
        Authorization: "Bearer " + access_token,
      };

      const body = {
        tracks: [
          {
            uri: req.body.track,
          },
        ],
      };
      console.log(body);

      const response = await axios.delete(
        `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
        {
          data: {
            tracks: [
              {
                uri: req.body.track,
              },
            ],
          },
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

  // app.get("/api/getplaylist", async (req: Request, res: Response) => {
  //   try {
  //     const playlist = await spotifyApi.getUserPlaylists();
  //     console.log(playlist.body);
  //     var playlistarray: playlistsarray[] = [];

  //     playlist.body.items.map((item) => {
  //       playlistarray.push({
  //         name: item.name,
  //         tracks: item.tracks,
  //         images: item.images,
  //       });
  //     });

  //     console.log(playlistarray);

  //     res.status(200).send(playlistarray);
  //   } catch (err) {
  //     res.status(400).send(err);
  //   }
  // });
};
