import { Request, Response } from "express";
import { UUID_LENGTH } from "../config";
import { InvalidInputError } from "../core/errors/api.error";

// Project imports
import logger from "../logger";
import generateUUID from "../core/utils/create-nanoid";
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
      const { name, year, month, type } = req.body;

      if (name.length <= 0) {
        throw new InvalidInputError("Invalid name");
      }

      if (!year || !month) {
        throw new InvalidInputError("Invalid year or month");
      }

      if (!type) {
        throw new InvalidInputError("Invalid Certificate type.");
      }

      let uuid = await generateUUID(UUID_LENGTH);

      // check if certificate already exists

      while (await this._certificateService.checkIfCertificateExists(uuid)) {
        uuid = await generateUUID(UUID_LENGTH);
      }

      const certificateData: CertificateDTO = {
        id: uuid,
        name: name,
        type: type,
        regno: req.body.regno || null,
        email: req.body.email || null,
        year: year,
        month: month,
      };

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

export class FetchCertificateImageController extends BaseController {
  private _certificateService: ICertificateService;

  constructor(certificateService: ICertificateService) {
    super();
    this._certificateService = certificateService;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const certificateImage = this._certificateService.fetchCertificateImage(
        req.params.uuid
      );

      BaseController.ok(res, await certificateImage);
    } catch (err) {
      logger.error("fetch-certificate-image-controller", err);
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
