// defaults
export const context = {
  SERVER_CONTEXT: "EXPRESS SERVER",
  DATABASE_CONTEXT: "DATABASE",
};

// env vars
export const PORT = process.env.PORT || 3000;

export const IS_TEST = process.env.NODE_ENV === "test";

export const UUID_LENGTH = parseInt(process.env.UUID_LENGTH || "6", 10);

export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";

export const DB_NAME = process.env.DB_NAME || "certificates";
