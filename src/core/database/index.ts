import mongoose from "mongoose";

// Project imports
import { context, MONGO_URI } from "../../config";
import logger from "../../logger";

const connectDB = async () => {
  try {
    return await mongoose.connect(MONGO_URI);
  } catch (err) {
    logger.error(context.DATABASE_CONTEXT, err);
  }
};

export { connectDB };
