import mongoose from "mongoose";

// Project imports
import { context, MONGO_URI } from "../../config";
import logger from "../../logger";

const connectDB = async () => {
  try {
    const url = `${MONGO_URI}`;

    return await mongoose.connect(url);
  } catch (err) {
    logger.error(context.DATABASE_CONTEXT, err);
  }
};

export { connectDB };
