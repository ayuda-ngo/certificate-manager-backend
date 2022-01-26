import { customAlphabet } from "nanoid/async";

const generateUUID = async (size: number): Promise<string> => {
  const nanoId = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", size);

  return await nanoId();
};

export default generateUUID;
