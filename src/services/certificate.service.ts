// Project imports
import { context } from "../config";
import { InvalidInputError } from "../core/errors";
import { InternalServerError, NotFoundError } from "../core/errors/api.error";
import { Certificate } from "../core/models/certificate";

import { generateCertificate } from "../core/utils/create-certificate";
import { getCertificateConfig } from "../core/utils/get-certificate-config";
import logger from "../logger";

export interface CertificateDTO {
  id: string;
  name: string;
  type: string;
  regno: string;
  email: string;
  year: string;
  month: string;
}

export interface ICertificateService {
  createCertificate(certificateData: CertificateDTO): Promise<any>;
  getCertificate(uuid: string): Promise<any>;
  fetchCertificateImage(uuid: string): Promise<any>;
  getCertificates(): Promise<any>;
  deleteCertificate(uuid: string): Promise<any>;
}

export class CertificateService implements ICertificateService {
  async getCertificate(uuid: string): Promise<any> {
    const certificate = await Certificate.findOne({
      uuid,
    });

    if (!certificate) {
      throw new NotFoundError(`Certificate with uuid ${uuid} not found!`);
    }

    return {
      uuid,
      name: certificate.name,
      regno: certificate.regno,
      email: certificate.email,
      type: certificate.type,
      url: `https://certify.ngoayuda.org/verify/${uuid}`,
    };
  }

  async fetchCertificateImage(uuid: string): Promise<any> {
    const certificate = await Certificate.findOne({
      uuid,
    });

    if (!certificate) {
      throw new NotFoundError(`Certificate with uuid ${uuid} not found!`);
    }

    const certificateConfig = getCertificateConfig({
      year: certificate.year,
      month: certificate.month,
    });

    return await generateCertificate({
      uuid: certificate.uuid,
      name: certificate.name,
      url: `https://certify.ngoayuda.org/verify/${uuid}`,
      certificateSettings: certificateConfig,
    });
  }

  async getCertificates(): Promise<any> {
    const certificates = await Certificate.find({});

    return certificates.map((certificate) => ({
      uuid: certificate.uuid,
      name: certificate.name,
      type: certificate.type,
      year: certificate.year,
      month: certificate.month,
      url: `https://certify.ngoayuda.org/verify/${certificate.uuid}`,
    }));
  }

  async createCertificate(certificateData: CertificateDTO): Promise<any> {
    const { id, name, email, type, regno, year, month } = certificateData;

    if (!name) {
      throw new InvalidInputError("Invalid name");
    }

    if (!year) {
      throw new InvalidInputError("Invalid year");
    }

    if (!month) {
      throw new InvalidInputError("Invalid month");
    }

    if (!type) {
      throw new InvalidInputError("Invalid Certificate type.");
    }

    const certificate = Certificate.build({
      uuid: id,
      name,
      type,
      email,
      regno,
      year,
      month,
    });

    await certificate.save();

    return {
      uuid: certificate.uuid,
      name: certificate.name,
      email: certificate.email,
      regno: certificate.regno,
    };
  }

  async deleteCertificate(uuid: string): Promise<any> {
    const certificate = await Certificate.findOne({
      where: {
        uuid,
      },
    });

    if (!certificate) {
      throw new NotFoundError(`Certificate with uuid ${uuid} not found!`);
    }

    try {
      await Certificate.deleteOne({
        where: {
          uuid,
        },
      });
    } catch (err: any) {
      logger.error(context.DATABASE_CONTEXT, err.message);
      throw new InternalServerError(err.message);
    }

    return {
      uuid: certificate.uuid,
      name: certificate.name,
    };
  }
}
