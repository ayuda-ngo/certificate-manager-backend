enum AvailableCertificateYears {
  _2019 = "2019",
  _2020 = "2020",
  _2021 = "2021",
}

enum AvailableCertificateNames {
  DECEMBER = "certificate-dec",
  JUNE = "certificate-jun",
  JULY = "certificate-jul",
}

export interface certificateData {
  uuid: string;
  name: string;
  url: string;
  certificateSettings: {
    name: string;
    settings: {
      fontColor: string;
      nameX: number;
      nameY: number;
      nameWidth: number;
      nameFontSize: number;
      qrCodeX: number;
      qrCodeY: number;
      qrCodeSize: number;
      urlX: number;
      urlY: number;
      urlFontSize: number;
    };
  };
}

export const AvailableCertificates = {
  [AvailableCertificateYears._2019]: {
    [AvailableCertificateNames.DECEMBER]: {
      name: "2019/certificate-dec.png",
      settings: {
        fontColor: "#231f20",
        nameX: 1840,
        nameY: 1758,
        nameFontSize: 100,
        qrCodeX: 1698,
        qrCodeY: 2730,
        qrCodeSize: 360,
        urlX: 1025,
        urlY: 3424,
        urlFontSize: 48,
      },
    },
  },
  [AvailableCertificateYears._2020]: {
    [AvailableCertificateNames.DECEMBER]: {
      name: "2020/certificate-dec.png",
      settings: {
        fontColor: "#231f20",
        nameX: 1840,
        nameY: 1752,
        nameWidth: 980,
        nameFontSize: 100,
        qrCodeX: 1698,
        qrCodeY: 2730,
        qrCodeSize: 360,
        urlX: 1025,
        urlY: 3424,
        urlFontSize: 48,
      },
    },
    [AvailableCertificateNames.JULY]: {
      name: "2020/certificate-jul.png",
      settings: {
        fontColor: "#231f20",
        nameX: 1840,
        nameY: 1758,
        nameWidth: 980,
        nameFontSize: 100,
        qrCodeX: 1698,
        qrCodeY: 2730,
        qrCodeSize: 360,
        urlX: 1018,
        urlY: 3426,
        urlFontSize: 48,
      },
    },
  },
  [AvailableCertificateYears._2021]: {
    [AvailableCertificateNames.JULY]: {
      name: "2021/certificate-jul.png",
      settings: {
        fontColor: "#231f20",
        nameX: 1840,
        nameY: 1758,
        nameWidth: 850,
        nameFontSize: 1000,
        qrCodeX: 1698,
        qrCodeY: 2730,
        qrCodeSize: 360,
        urlX: 1018,
        urlY: 3428,
        urlFontSize: 50,
      },
    },
  },
};

// @ts-ignore
export const getCertificateConfig = ({ year, month }) => {
  // @ts-ignore
  const certificateConfig = AvailableCertificates[year][month];

  if (!certificateConfig) {
    throw new Error(
      `Certificate not found for year ${year} and month ${month}`
    );
  }

  return certificateConfig;
};
