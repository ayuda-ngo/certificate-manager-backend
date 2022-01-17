import { NextFunction, Request, Response, Router } from "express";
import validator from "validator";

// Project imports
import { BadRequestError } from "../core/errors/api.error";
import {
  fetchCertificateImage,
  generateCertificate,
  getCertificate,
  getCertificates,
} from "../loaders/certificate.loader";

const router = Router();

router.param("id", (_req: Request, _res: Response, next: NextFunction, id) => {
  if (!validator.isUUID(id, 4)) {
    next(new BadRequestError("Invalid Short Url Id!"));
    return;
  }
  next();
});

router.post("/new", generateCertificate.execute);
router.get("/", getCertificates.execute);
router.get("/:uuid/image", fetchCertificateImage.execute);
router.get("/:uuid", getCertificate.execute);

router.delete("/:uuid");

export default router;
