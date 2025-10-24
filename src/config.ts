import dotenv from "dotenv";

dotenv.config();

export const apiId = Number(process.env.API_ID);
export const apiHash = process.env.API_HASH!;
export const sourceChanel = process.env.SOURCE_CHANEL!;
export const targetGroup = process.env.TARGET_GROUP!;
export const targetUser = process.env.TARGET_USER!;
export const targetUserPhoneNumber = process.env.USER_PHONE_NUMBER!;

export const twilioAccountSid = process.env.TWILIO_SID!;
export const twilioAuthToken = process.env.TWILIO_TOKEN!;
export const twilioNumber = process.env.TWILIO_NUMBER!;

export const targetArea = 1293; // унікальний uid ідентифікатора м. Харків з https://docs.google.com/spreadsheets/d/1XnTOzcPHd1LZUrarR1Fk43FUyl8Ae6a6M7pcwDRjNdA/edit?gid=0#gid=0
