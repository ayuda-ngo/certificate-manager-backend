import { v4 as uuidv4 } from "uuid";

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
    let { name } = certificateData;

    if (!name) {
      name = "Vidipt";
      // throw new InvalidInputError("Invalid name");
    }

    const id = uuidv4();

    console.log(`Generating certificate for ${name} with UID : ${id}`);

    return await generateCertificate(name);
  }
}
