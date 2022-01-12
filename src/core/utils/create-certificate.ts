import { Canvas, createCanvas, loadImage } from "canvas";
import QRCode from "qrcode";
import { createWriteStream, existsSync, mkdirSync, readFileSync } from "fs";
import { context } from "../../config";
import logger from "../../logger";

interface certificateData {
  name: string;
  url: string;
}

export const generateCertificate = async (data: certificateData) => {
  try {
    const blankCertificateFile = await readFileSync(
      "./src/assets/template/certificate.jpg"
    );
    const certificateImage = await loadImage(blankCertificateFile);

    const canvas = createCanvas(
      certificateImage.width,
      certificateImage.height
    );
    const ctx = canvas.getContext("2d");
    ctx.drawImage(certificateImage, 0, 0, canvas.width, canvas.height);

    ctx.font = "bold 100px Arial";
    ctx.fillStyle = "#696969";
    ctx.textAlign = "center";
    ctx.fillText(data.name, certificateImage.width / 2, 1060);

    const qrcode = await QRCode.toBuffer(data.url);
    const qrcodeImage = await loadImage(qrcode);
    ctx.drawImage(
      qrcodeImage,
      canvas.width - 300,
      canvas.height - 300,
      250,
      250
    );

    // Optional: Save the certificate.
    saveCertificate(data.name, canvas);

    return canvas.toDataURL();
  } catch (err) {
    logger.error(context.SERVER_CONTEXT, "Error generating certificate", err);
    throw new Error();
  }
};

const saveCertificate = async (name: string, canvas: Canvas) => {
  if (!existsSync(__dirname + "../../../assets/certificates/")) {
    mkdirSync(__dirname + "../../../assets/certificates/");
  }
  const out = createWriteStream(
    __dirname + `../../../assets/certificates/${name}.png`
  );
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () =>
    logger.info(context.SERVER_CONTEXT, `Certificate of ${name} was created.`)
  );
};
