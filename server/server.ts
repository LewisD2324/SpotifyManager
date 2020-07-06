import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
//https://medium.com/@kiesp/playing-with-spotify-api-using-expressjs-bd8f25392ff3
//https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/
//https://github.com/Pau1fitz/react-spotify

var app = express();

app
  .use(express.static(__dirname + "public"))
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.json());

console.log("Listening on 8888");
app.listen(8888);
