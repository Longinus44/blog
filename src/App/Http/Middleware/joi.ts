import joi from 'joi'
import { Request, Response, NextFunction } from 'express';

export const blogValidationSchema = joi.object({
    title: joi.string().required().min(5).max(120),
    content: joi.string().required(),
  });

  export const userSignupValidationSchema = joi.object({
    username:joi.string().required().min(2),
    email:joi.string().email().required(),
    password:joi.string().required().min(8)
  });

  export const userLoginValidationSchema = joi.object({
    username:joi.string().required().min(2),
    password:joi.string().required().min(8)
  })
  
  export const validate = (schema: any, data: any) => {
    const { error } = schema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
  };
  
  export declare const schemaValidationMDW: (schema: joi.Schema, type?: 'body' | 'params' | 'query') => (req: Request, _res: Response, next: NextFunction) => void;
  