import { invalid } from "joi";

require('dotenv').config();

export const AppConfig = {
  serverHost: String(process.env.HOST),
  port: String(process.env.PORT),
  host: String(process.env.DB_HOST),
  user: String(process.env.DB_USER),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_NAME),
  client: String(process.env.DB_CLIENT),
  JwtsecretKey: String(process.env.JWTKEY),
  INTERNAL_ERROR:String(process.env.INTERNAL_ERROR),
  USER_EXIST:String(process.env.USER_EXIST),
  EMAIL_EXIST:String(process.env.EMAIL_EXIST),
  USER_NOT_FOUND:String(process.env.USER_NOT_FOUND),
  BLOG_NOT_FOUND:String(process.env.BLOG_NOT_FOUND),
  INVALID_CREDENTAILS:String(process.env.INVALID_CREDENTAILS),
  UNAUTHORIZED:String(process.env.UNATHORIZED),
  SUCCESS_MSG:String(process.env.SUCCESS_MSG)
};
