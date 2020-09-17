import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import authroute from "./routes/authRoute";
import trackroute from "./routes/trackRoute";
import playlistroute from "./routes/playlistRoute";
import artistroute from "./routes/artistRoute";
import albumroute from "./routes/albumRoute";

const app = express();

app
  .use(express.static(__dirname + "public"))
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.json());

authroute(app);
trackroute(app);
playlistroute(app);
artistroute(app);
albumroute(app);

console.log("Listening on 8888");
app.listen(8888);
