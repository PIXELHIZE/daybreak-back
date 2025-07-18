import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import "./db/sqlite.js";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 시작됨`);
});
