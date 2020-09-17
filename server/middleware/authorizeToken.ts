import { expirationTime } from "./../routes/authRoute";
import { access_token, expires_in, refresh_token } from "../routes/authRoute";
import { NextFunction, Request, Response, response } from "express";
import request from "request";
import { client_id } from "../config/dev";
export default function (req: Request, res: Response, next: NextFunction) {
  if (access_token === null) return res.sendStatus(401);

  if (!expirationTime || new Date().getTime() > expirationTime) {
    console.log("expired");
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
        client_id: client_id,
      },
      json: true,
    };

    request.post(authOptions, function (error: any, response: any, body: any) {
      if (!error && response.statusCode === 200) {
        // access_token = body.access_token;
        console.log(body);
        req.body.access_token = body.access_token;
        next();
      }
    });
  } else {
    console.log("not expired");

    req.body.access_token = access_token;
    next();
  }
}
