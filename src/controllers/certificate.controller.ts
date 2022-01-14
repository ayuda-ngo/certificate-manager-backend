import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { UUID_LENGTH } from "../config";
import { ApiError, InvalidInputError } from "../core/errors/api.error";

import logger from "../logger";

// Project imports
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
      const { name } = req.body;

      if (name.length <= 0) {
        throw new InvalidInputError("Invalid name");
      }

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

export class GetCertificateController extends BaseController {
  private _certificateService: ICertificateService;

  constructor(certificateService: ICertificateService) {
    super();
    this._certificateService = certificateService;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const certificate = this._certificateService.getCertificate(
        req.params.uuid
      );

      BaseController.ok(res, await certificate);
    } catch (err) {
      logger.error("get-certificate-controller", err);
      BaseController.fail(res, err as Error);
    }
  }
}

export class GetCertificatesController extends BaseController {
  private _certificateService: ICertificateService;

  constructor(certificateService: ICertificateService) {
    super();
    this._certificateService = certificateService;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const certificates = this._certificateService.getCertificates();

      BaseController.ok(res, await certificates);
    } catch (err) {
      logger.error("get-certificates-controller", err);
      BaseController.fail(res, err as Error);
    }
  }
}

export class DeleteCertificateController extends BaseController {
  private _certificateService: ICertificateService;

  constructor(certificateService: ICertificateService) {
    super();
    this._certificateService = certificateService;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const certificate = this._certificateService.deleteCertificate(
        req.params.uuid
      );

      BaseController.ok(res, await certificate);
    } catch (err) {
      logger.error("delete-certificate-controller", err);
      BaseController.fail(res, err as Error);
    }
  }
}
