import path from "path";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import fs from "fs";
import http from "http";
import https from "https";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import venueRoutes from "./routes/venueRoutes.js";
import showRoutes from "./routes/showRoutes.js";
import castMemberRoutes from "./routes/castMemberRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

let credentials = {};

//Certificate
if (process.env.NODE_ENV === "production") {
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/thesv3n.ddns.net/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/thesv3n.ddns.net/cert.pem",
    "utf8"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/thesv3n.ddns.net/chain.pem",
    "utf8"
  );

  credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };
} else {
  credentials = {
    key: "",
    cert: "",
    ca: "",
  };
}

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/castmembers/", castMemberRoutes);
app.use("/api/companies/", companyRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

if (process.env.NODE_ENV === "production") {
  httpsServer.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
    )
  );
} else {
  httpServer.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
    )
  );
}
