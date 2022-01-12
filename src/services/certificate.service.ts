// project imports
import { InvalidInputError } from "../core/errors";

import { generateCertificate } from "../core/utils/create-certificate";

export interface CertificateDTO {
  id: string;
  name: string;
}

export interface ICertificateService {
  createCertificate(certificateData: CertificateDTO): Promise<string>;
}

export class CertificateService implements ICertificateService {
  async createCertificate(certificateData: CertificateDTO): Promise<string> {
    let { id, name } = certificateData;

    if (!name) {
      throw new InvalidInputError("Invalid name");
    }

    return await generateCertificate({
      name,
      url: `https://certify.ngoayuda.org/verify/${id}`,
    });
  }
}
