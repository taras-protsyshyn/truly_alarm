import dotenv from "dotenv";
dotenv.config();

export const apiId = Number(process.env.API_ID);
export const apiHash = process.env.API_HASH!;
export const sourceChanel = process.env.SOURCE_CHANEL!;
export const targetGroup = process.env.TARGET_GROUP!;
export const targetUser = process.env.TARGET_USER!;
