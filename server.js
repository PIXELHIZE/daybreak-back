// server.js
import dotenv from "dotenv";
dotenv.config(); // .env 로드

import app from "./app.js"; // 기존 app.js
import "./db/sqlite.js"; // DB 연결 (side-effect)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀  API server ready at http://localhost:${PORT}`);
});
