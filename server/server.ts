import { client_id, client_secret, redirect_uri } from "./config/dev";
import express, { NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import querystring from "querystring";
import request from "request";
import { Request, Response } from "express";
import authroute from "./routes/authRoute";

//https://medium.com/@kiesp/playing-with-spotify-api-using-expressjs-bd8f25392ff3
//https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/
//https://github.com/Pau1fitz/react-spotify

//https://fusionauth.io/blog/2020/03/10/securely-implement-oauth-in-react
var app = express();

app
  .use(express.static(__dirname + "public"))
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.json());

authroute(app);

console.log("Listening on 8888");
app.listen(8888);
