import "dotenv/config";
import cors from "cors";
import url from "url";
import express from "express";
import cookie from "cookie-parser";
import { router } from "./router/index.js";

const __dirname = url.fileURLToPath(import.meta.url);

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  credentials: true,
  origin: process.env.URL || "*",
};

app.use(cors(corsOptions));
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("server/views"));
app.use("/", router);

function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("starting error:", err);
  }
}
start();
