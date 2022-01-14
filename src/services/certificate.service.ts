// Project imports
import { context } from "../config";
import { InvalidInputError } from "../core/errors";
import { InternalServerError, NotFoundError } from "../core/errors/api.error";
import { Certificate } from "../core/models/certificate";

import { generateCertificate } from "../core/utils/create-certificate";
import logger from "../logger";

export interface CertificateDTO {
  id: string;
  name: string;
}

export interface ICertificateService {
  createCertificate(certificateData: CertificateDTO): Promise<any>;
  getCertificate(uuid: string): Promise<any>;
  getCertificates(): Promise<any>;
  deleteCertificate(uuid: string): Promise<any>;
}

export class CertificateService implements ICertificateService {
  async getCertificate(uuid: string): Promise<any> {
    const certificate = await Certificate.findOne({
      where: {
        uuid,
      },
    });

    if (!certificate) {
      throw new NotFoundError(`Certificate with uuid ${uuid} not found!`);
    }

    return {
      uuid,
      name: certificate.name,
      image: await generateCertificate({
        uuid: certificate.uuid,
        name: certificate.name,
        url: `https://certify.ngoayuda.org/verify/${uuid}`,
        certificate: {
          year: "2022",
          name: "certificate-dec",
        },
      }),
    };
  }

  async getCertificates(): Promise<any> {
    const certificates = await Certificate.find({});

    return certificates.map((certificate) => ({
      uuid: certificate.uuid,
      name: certificate.name,
      url: `https://certify.ngoayuda.org/verify/${certificate.uuid}`,
    }));
  }

  async createCertificate(certificateData: CertificateDTO): Promise<any> {
    const { id, name } = certificateData;

    if (!name) {
      throw new InvalidInputError("Invalid name");
    }

    const certificate = Certificate.build({
      uuid: id,
      name,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    });

    await certificate.save();

    return {
      uuid: certificate.uuid,
      name: certificate.name,
      image: await generateCertificate({
        uuid: certificate.uuid,
        name: certificate.name,
        url: `https://certify.ngoayuda.org/verify/${id}`,
        certificate: {
          year: "2022",
          name: "certificate-dec",
        },
      }),
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
      throw new InternalServerError(err as Error.message);
    }

    return {
      uuid: certificate.uuid,
      name: certificate.name,
    };
  }
}
