import mongoose from "mongoose";
import { DB_NAME, MONGO_URI } from "../../config";

// project imports

const startDB = async () => {
  const url = `${MONGO_URI}/${DB_NAME}`;

  await mongoose.connect(url);
};

export { startDB };
