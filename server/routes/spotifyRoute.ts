import axios from "axios";
import { Request, Response } from "express";
import { access_token } from "./authRoute";

export default (app: any) => {
  app.get("/api/userinfo", async (req: Request, res: Response) => {
    try {
      var result = await axios.get("https://api.spotify.com/v1/me");
      console.log(result.data);
      res.status(200).send(result.data);
    } catch (err) {
      res.status(400).send(err);
    }
  });

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

  app.get("/api/getplaylist", async (req: Request, res: Response) => {
    try {
      const headers = {
        Authorization: "Bearer " + access_token,
      };

      const response = await axios.get(
        `https://api.spotify.com/v1/me/playlists`,
        { headers }
      );

      console.log(response.data.items);

      res.status(200).send(response.data.items);
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
