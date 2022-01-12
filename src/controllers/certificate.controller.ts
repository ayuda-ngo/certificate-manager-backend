import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { UUID_LENGTH } from "../config";

import logger from "../logger";

// project imports
import {
  CertificateDTO,
  ICertificateService,
} from "../services/certificate.service";
import { BaseController } from "./BaseController";

export class GenerateCertificateController extends BaseController {
  private _certificateService: ICertificateService;

  constructor(certificateService: ICertificateService) {
    super();
    this._certificateService = certificateService;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const certificateData: CertificateDTO = {
        id: nanoid(UUID_LENGTH),
        name: req.body.name,
      };

      logger.debug("create-certificate-controller", certificateData);

      const certificate =
        this._certificateService.createCertificate(certificateData);

      BaseController.created(res, await certificate);
    } catch (err) {
      logger.error("create-certificate-controller", err);
      BaseController.fail(res, err as Error);
    }
  }
}
