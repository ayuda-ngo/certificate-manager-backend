import { UnauthorizedError } from "../errors/api.error";
import * as config from "../../config";

export const checkAuthToken = (req: any, res: any, next: any) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Authorization header is missing");
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError("Token is missing");
  }

  if (token === config.API_KEY) {
    next();
  } else {
    throw new UnauthorizedError(`Invalid token: ${token}`);
  }
};
