import { Canvas, Image, createCanvas, loadImage } from "canvas";
import QRCode from "qrcode";
import { createWriteStream, existsSync, mkdirSync, readFileSync } from "fs";
import {
  CERTIFICATE_OUT_DIR,
  CERTIFICATE_TEMPLATE_DIR,
  certificateDefaults,
  context,
} from "../../config";
import logger from "../../logger";

interface certificateData {
  uuid: string;
  name: string;
  url: string;
  certificate: {
    year: string;
    name: string;
  };
}

export const generateCertificate = async (data: certificateData) => {
  try {
    const blankCertificateFile: Buffer = await readFileSync(
        `${CERTIFICATE_TEMPLATE_DIR}/${data.certificate.year}/${data.certificate.name}.png`
      ),
      certificateImage: Image = await loadImage(blankCertificateFile),
      canvas = createCanvas(certificateImage.width, certificateImage.height),
      ctx = canvas.getContext("2d");
    ctx.drawImage(certificateImage, 0, 0, canvas.width, canvas.height);

    // Adjust Font Size
    let { fontSize } = certificateDefaults;
    const fontFace = certificateDefaults.font,
      { fontColor } = certificateDefaults;

    do {
      fontSize--;
      ctx.font = `${fontSize}px ${fontFace}`;
    } while (ctx.measureText(data.name).width > 850);

    ctx.font = `${fontSize}px ${fontFace}`;
    ctx.fillStyle = fontColor;
    ctx.textAlign = "center";

    ctx.fillText(data.name, certificateImage.width - 725, 1750);

    // Generate QRCode.
    const qrcode: Buffer = await QRCode.toBuffer(data.url),
      qrcodeImage: Image = await loadImage(qrcode);
    ctx.drawImage(qrcodeImage, 1698, 2730, 360, 360);

    // Write the Certificate URL
    ctx.font = `44px ${fontFace}`;
    ctx.fillStyle = fontColor;
    ctx.textAlign = "left";
    ctx.fillText(data.url, 1125, 3400);

    /*
     * Optional: Save the certificate.
     * Await saveCertificate({ name: data.name, uuid: data.uuid }, canvas);
     */

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
