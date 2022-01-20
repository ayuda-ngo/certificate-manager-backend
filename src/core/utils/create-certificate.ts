import { Canvas, Image, createCanvas, loadImage } from "canvas";
import QRCode from "qrcode";
import { createWriteStream, existsSync, mkdirSync, readFileSync } from "fs";
import {
  CERTIFICATE_OUT_DIR,
  CERTIFICATE_TEMPLATE_DIR,
  context,
} from "../../config";
import logger from "../../logger";

// project imports
import { certificateData } from "./get-certificate-config";

export const generateCertificate = async (data: certificateData) => {
  try {
    const certificateSettings = data.certificateSettings.settings;

    const blankCertificateFile: Buffer = await readFileSync(
        `${CERTIFICATE_TEMPLATE_DIR}/${data.certificateSettings.name}`
      ),
      certificateImage: Image = await loadImage(blankCertificateFile),
      canvas = createCanvas(certificateImage.width, certificateImage.height),
      ctx = canvas.getContext("2d");
    ctx.drawImage(certificateImage, 0, 0, canvas.width, canvas.height);

    // Adjust Font Size
    let fontSize = certificateSettings.nameFontSize;
    const fontFace = "Times New Roman";
    do {
      fontSize--;
      ctx.font = `${fontSize}px ${fontFace}`;
    } while (ctx.measureText(data.name).width > certificateSettings.nameWidth);

    ctx.font = `${fontSize}px ${fontFace}`;
    ctx.fillStyle = certificateSettings.fontColor;
    ctx.textAlign = "center";

    ctx.fillText(
      data.name,
      certificateSettings.nameX,
      certificateSettings.nameY
    );

    // Generate QRCode.
    const qrcode: Buffer = await QRCode.toBuffer(data.url),
      qrcodeImage: Image = await loadImage(qrcode);
    ctx.drawImage(
      qrcodeImage,
      certificateSettings.qrCodeX,
      certificateSettings.qrCodeY,
      certificateSettings.qrCodeSize,
      certificateSettings.qrCodeSize
    );

    // Write the Certificate URL
    ctx.font = `${certificateSettings.urlFontSize}px Arial`;
    ctx.fillStyle = certificateSettings.fontColor;
    ctx.textAlign = "left";
    ctx.fillText(data.url, certificateSettings.urlX, certificateSettings.urlY);

    // Optional: Save the certificate.
    // await saveCertificate({ name: data.name, uuid: data.uuid }, canvas);

    return canvas.toDataURL();
  } catch (err) {
    logger.error(context.SERVER_CONTEXT, "Error generating certificate", err);
    throw new Error();
  }
};

const saveCertificate = async (
  data: { name: string; uuid: string },
  canvas: Canvas
) => {
  if (!existsSync(__dirname + CERTIFICATE_OUT_DIR)) {
    mkdirSync(__dirname + CERTIFICATE_OUT_DIR);
  }
  const out = createWriteStream(
      `${__dirname + CERTIFICATE_OUT_DIR}/${data.uuid}.png`
    ),
    stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () =>
    logger.info(
      context.SERVER_CONTEXT,
      `Certificate of ${data.name} was saved.`
    )
  );
};
