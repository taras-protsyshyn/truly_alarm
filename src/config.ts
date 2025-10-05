import dotenv from "dotenv";
dotenv.config();

export const apiId = Number(process.env.API_ID);
export const apiHash = process.env.API_HASH!;
export const channelUsername = process.env.CHANNEL_USERNAME!;
export const recipients = process.env.RECIPIENTS!.split(",");
