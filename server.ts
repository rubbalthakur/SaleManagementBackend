import dotenv from "dotenv";

dotenv.config();
import app from "./app";
import { connectDb } from "./models";


const PORT = process.env.PORT || 3001;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("server is running on port", PORT);
  });
});
