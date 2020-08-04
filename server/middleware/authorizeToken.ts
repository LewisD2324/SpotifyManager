import { expirationTime } from "./../routes/authRoute";
import { access_token, expires_in, refresh_token } from "../routes/authRoute";
import { NextFunction, Request, Response, response } from "express";
import request from "request";
import { client_id, client_secret } from "../config/dev";
export default function (req: Request, res: Response, next: NextFunction) {
  //   const authHeader = req.headers['authorization']

  const token = access_token;
  console.log(token);

  if (token == null) return res.sendStatus(401);

  if (!expirationTime || new Date().getTime() > expirationTime) {
    console.log("expired");
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
        // access_token = body.access_token;
        console.log(body.access_token);
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

//  // AUTHENTICATION
//  app.use(async (req) => {
//     try {
//         const token = req.headers.authorization || req.cookies.auth
//         const { person } = await jwt.verify(token, SECRET)
//         req.person = person
//         return req.next()
//     } catch (e) {
//         return req.next()
//     }
// })
