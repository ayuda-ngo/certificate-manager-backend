// project imports

import { GenerateCertificateController } from "../controllers/certificate.controller";
import { CertificateService } from "../services/certificate.service";

export const certificateService = new CertificateService();

export const generateCertificate = new GenerateCertificateController(
  certificateService
);
