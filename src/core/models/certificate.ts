import { Document, Model, Schema, model } from "mongoose";

interface CertificateAttributes {
  uuid: string;
  name: string;
  startDate: string;
  endDate: string;
}

export interface CertificateDoc extends Document {
  uuid: string;
  name: string;
  startDate: string;
  endDate: string;
}

interface CertificateModel extends Model<CertificateDoc> {
  build(attributes: CertificateAttributes): CertificateDoc;
}

const certificateSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});

certificateSchema.statics.build = (attributes: CertificateAttributes) =>
  new Certificate({
    uuid: attributes.uuid,
    name: attributes.name,
    startDate: attributes.startDate,
    endDate: attributes.endDate,
  });

const Certificate = model<CertificateDoc, CertificateModel>(
  "Certificate",
  certificateSchema
);

export { Certificate };
