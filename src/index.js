import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";
import { connectToDb } from "./config/database.js";

const port = process.env.PORT || 4040;
connectToDb().then(() => {
  app.listen(port, () => console.log(`server started successfully at ${port}`));
});
