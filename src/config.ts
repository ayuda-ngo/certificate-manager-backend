if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Defaults
export const context = {
  SERVER_CONTEXT: "EXPRESS SERVER",
  DATABASE_CONTEXT: "DATABASE",
};

export const CERTIFICATE_TEMPLATE_DIR = "./src/assets/template";

export const CERTIFICATE_OUT_DIR = "../../../assets/certificates";

// Env vars
export const PORT = process.env.PORT || 8080;

export const API_KEY = process.env.API_KEY || "NONE";

export const IS_TEST = process.env.NODE_ENV === "test";

export const UUID_LENGTH = parseInt(process.env.UUID_LENGTH || "6", 10);

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/certificates";
