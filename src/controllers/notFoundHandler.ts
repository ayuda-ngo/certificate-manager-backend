import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../core/errors/api.error";

// Project imports

import logger from "../logger";

const NOT_FOUND_HANDLER_CONTEXT = "EXPRESS-NOT-FOUND-HANDLER";

export default (req: Request, _res: Response, next: NextFunction) => {
  logger.debug(
    NOT_FOUND_HANDLER_CONTEXT,
    `Not found handler called for ${req.url}`
  );
  next(new NotFoundError(`${req.url} not found`));
};
