import { AppConfig } from "../../Config/appConfig";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


export const tokenValidation = (req: Request & { user?: string }, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    const secretKey = AppConfig.JwtsecretKey;
    if (token) {
      const decodedToken = jwt.verify(token, secretKey) as { data: { user_id: string } };

      if (decodedToken && decodedToken.data && decodedToken.data.user_id) {
        req.user = decodedToken.data.user_id;
        next();
      }
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }

  } catch (err: any) {
    return res.status(401).json({ error: 'Unauthorized', message: err.message });
  }
};

