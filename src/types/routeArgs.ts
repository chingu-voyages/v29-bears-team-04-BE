import { NextFunction, Request, Response } from 'express';

export interface RouteArgs {
  req: Request,
  res: Response,
  next: NextFunction
}