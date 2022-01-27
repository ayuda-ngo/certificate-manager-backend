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

const AvailableCertificateTypes = {
  volunteering: "VOLUNTEERING",
  workshop: "WORKSHOP",
  event: "EVENT",
};

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
        fontColor: "#1c1b1a",
        nameX: 1815,
        nameY: 1758,
        nameWidth: 1000,
        nameFontSize: 100,
        qrCodeX: 1698,
        qrCodeY: 2730,
        qrCodeSize: 360,
        urlX: 1010,
        urlY: 3434,
        urlFontSize: 48,
      },
    },
  },
  [AvailableCertificateYears._2020]: {
    [AvailableCertificateNames.DECEMBER]: {
      name: "2020/certificate-dec.png",
      settings: {
        fontColor: "#1c1b1a",
        nameX: 1815,
        nameY: 1752,
        nameWidth: 980,
        nameFontSize: 100,
        qrCodeX: 1698,
        qrCodeY: 2730,
        qrCodeSize: 360,
        urlX: 1010,
        urlY: 3434,
        urlFontSize: 48,
      },
    },
    [AvailableCertificateNames.JULY]: {
      name: "2020/certificate-jul.png",
      settings: {
        fontColor: "#1c1b1a",
        nameX: 1815,
        nameY: 1758,
        nameWidth: 980,
        nameFontSize: 100,
        qrCodeX: 1698,
        qrCodeY: 2730,
        qrCodeSize: 360,
        urlX: 1010,
        urlY: 3432,
        urlFontSize: 48,
      },
    },
  },
  [AvailableCertificateYears._2021]: {
    [AvailableCertificateNames.JULY]: {
      name: "2021/certificate-jul.png",
      settings: {
        fontColor: "#1c1b1a",
        nameX: 1820,
        nameY: 1758,
        nameWidth: 850,
        nameFontSize: 100,
        qrCodeX: 1698,
        qrCodeY: 2730,
        qrCodeSize: 360,
        urlX: 1012,
        urlY: 3434,
        urlFontSize: 50,
      },
    },
  },
};

// @ts-ignore
export const getCertificateConfig = ({ year, month }) => {
  try {
    // @ts-ignore
    const certificateConfig = AvailableCertificates[year][month];

    return certificateConfig;
  } catch {
    return null;
  }
};

export const getCertificateType = (type: string) => {
  try {
    // @ts-ignore
    const certificateType = AvailableCertificateTypes[type];

    return certificateType;
  } catch {
    return null;
  }
};
