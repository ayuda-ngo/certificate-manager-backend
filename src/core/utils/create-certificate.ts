import { Canvas, createCanvas, loadImage } from "canvas";
import { createWriteStream, existsSync, mkdirSync, readFileSync } from "fs";
import logger from "../../logger";

export const generateCertificate = async (name: string) => {
  try {
    const data = await readFileSync("./src/assets/template/certificate.jpg");
    const certificateImage = await loadImage(data);

    const canvas = createCanvas(
      certificateImage.width,
      certificateImage.height
    );
    const ctx = canvas.getContext("2d");
    ctx.drawImage(certificateImage, 0, 0, canvas.width, canvas.height);

    ctx.font = "bold 100px Arial";
    ctx.fillStyle = "#696969";
    ctx.textAlign = "center";
    ctx.fillText(name, certificateImage.width / 2, 1060);
    saveCertificate(name, canvas);
    return canvas.toDataURL();
  } catch (err) {
    logger.error("utils", "Error generating certificate", err);
    throw new Error();
  }
};

const saveCertificate = async (name: string, data: Canvas) => {
  if (!existsSync(__dirname + "../../../assets/certificates/")) {
    mkdirSync(__dirname + "../../../assets/certificates/");
  }
  const out = createWriteStream(
    __dirname + `../../../assets/certificates/${name}.png`
  );
  const stream = data.createPNGStream();
  stream.pipe(out);
  out.on("finish", () =>
    logger.info("utils", `Certificate of ${name} was created.`)
  );
};
