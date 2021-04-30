import { Request, Response } from 'express';
export const checkSessionExpired = (req: Request, res: Response) => {
  if(!req.session.userId) {
   return res.status(401).json({
     success: false,
     error: {
       field: "session",
       message: "Your session has expired, please login again."
     }
   })
 };
 return 
}