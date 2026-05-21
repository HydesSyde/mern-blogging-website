import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import health from "./health.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use("/health", health);
app.use("/api/auth", authRoutes);

const Port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(Port, () => {
  console.log(`Server is running at http://localhost:${Port}`);
});
