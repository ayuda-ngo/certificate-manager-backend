import { Document, Model, Schema, model } from "mongoose";

interface CertificateAttributes {
  uuid: string;
  name: string;
  email: string;
  regno: string;
  year: string;
  month: string;
  type: string;
  service: string | null | undefined;
}

export interface CertificateDoc extends Document {
  uuid: string;
  name: string;
  email: string;
  regno: string;
  year: string;
  month: string;
  type: string;
  service: string | null | undefined;
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
  type: {
    type: String,
    required: true,
  },
  service: {
    type: String,
  },
  email: {
    type: String,
  },
  regno: {
    type: String,
  },
  year: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
});

certificateSchema.statics.build = (attributes: CertificateAttributes) =>
  new Certificate({
    uuid: attributes.uuid,
    name: attributes.name,
    type: attributes.type,
    service: attributes.service,
    email: attributes.email,
    regno: attributes.regno,
    year: attributes.year,
    month: attributes.month,
  });

const Certificate = model<CertificateDoc, CertificateModel>(
  "Certificate",
  certificateSchema
);

export { Certificate };
