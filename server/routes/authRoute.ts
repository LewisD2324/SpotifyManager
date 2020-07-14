import axios from "axios";
import { client_id, client_secret, redirect_uri } from "../config/dev";
import querystring from "querystring";
import request from "request";
import { Request, Response } from "express";

var generateRandomString = function (length: number) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export let access_token = "";
export let refresh_token = "";
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

var stateKey = "spotify_auth_state";

export default (app: any) => {
  app.get("/api/userinfo", async (req: Request, res: Response) => {
    try {
      const headers = {
        Authorization: "Bearer " + access_token,
      };
      var result = await axios.get("https://api.spotify.com/v1/me", {
        headers,
      });
      console.log(result.data);
      res.status(200).send(result.data);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get("/login", function (req: Request, res: Response) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope =
      "user-read-private user-read-email playlist-modify-public playlist-read-collaborative playlist-read-private playlist-modify-private";
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state,
        })
    );
  });

  app.get("/callback", function (req: Request, res: Response) {
    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
      res.redirect(
        "http://localhost:3000/Landing/#" +
          querystring.stringify({
            error: "state_mismatch",
          })
      );
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: "authorization_code",
        },
        headers: {
          Authorization:
            "Basic " +
            new Buffer(client_id + ":" + client_secret).toString("base64"),
        },
        json: true,
      };

      request.post(authOptions, function (
        error: any,
        response: any,
        body: any
      ) {
        if (!error && response.statusCode === 200) {
          access_token = body.access_token;
          refresh_token = body.refresh_token;

          var options = {
            url: "https://api.spotify.com/v1/me",
            headers: { Authorization: "Bearer " + access_token },
            json: true,
          };

          // use the access token to access the Spotify Web API
          request.get(options, function (error: any, response: any, body: any) {
            console.log(body);
          });

          // we can also pass the token to the browser to make requests from there
          res.redirect("http://localhost:3000/Landing/");
        } else {
          res.redirect(
            "/" +
              querystring.stringify({
                error: "invalid_token",
              })
          );
        }
      });
    }
  });

  app.get("/api/refresh_token", function (req: Request, res: Response) {
    // requesting access token from refresh token
    // refresh_token = req.query.refresh_token.toString();

    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      form: {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      },
      json: true,
    };

    request.post(authOptions, function (error: any, response: any, body: any) {
      if (!error && response.statusCode === 200) {
        access_token = body.access_token;
        console.log(access_token);
        res.send({
          access_token: access_token,
        });
      }
    });
  });
};
