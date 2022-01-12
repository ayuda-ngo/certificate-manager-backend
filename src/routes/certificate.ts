import { NextFunction, Request, Response, Router } from "express";
import validator from "validator";

// project imports
import { BadRequestError } from "../core/errors/api.error";
import { generateCertificate } from "../loaders/certificate.loader";

const router = Router();

router.param("id", (_req: Request, _res: Response, next: NextFunction, id) => {
  if (!validator.isUUID(id, 4)) {
    next(new BadRequestError("Invalid Short Url Id!"));
    return;
  }
  next();
});

router.post("/new", generateCertificate.execute);

export default router;
