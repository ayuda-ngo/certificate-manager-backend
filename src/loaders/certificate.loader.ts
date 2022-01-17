// Project imports

import {
  DeleteCertificateController,
  FetchCertificateImageController,
  GenerateCertificateController,
  GetCertificateController,
  GetCertificatesController,
} from "../controllers/certificate.controller";
import { CertificateService } from "../services/certificate.service";

export const certificateService = new CertificateService();

export const generateCertificate = new GenerateCertificateController(
  certificateService
);

export const getCertificate = new GetCertificateController(certificateService);

export const getCertificates = new GetCertificatesController(
  certificateService
);

export const deleteCertificate = new DeleteCertificateController(
  certificateService
);

export const fetchCertificateImage = new FetchCertificateImageController(
  certificateService
);
