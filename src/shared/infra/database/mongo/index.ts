import "dotenv/config";

import mongoose from "mongoose";
import logger from "../../../../shared/utils/Logger";

const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => logger.ok("MongoDB connected!\n"))
  .catch((error) => logger.error(error));
