import { Request, Response } from "express";
import logger from "../logger";

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
      const certificateData: CertificateDTO = req.body;
      const certificate =
        this._certificateService.createCertificate(certificateData);

      BaseController.created(res, await certificate);
    } catch (err) {
      logger.error("create-certificate-controller", err);
      BaseController.fail(res, err as Error);
    }
  }
}
