import { NextFunction, Request, Response } from "express";

export function handleError(err: any,  req: Request, res: Response, next: NextFunction) {

  if (err instanceof ConflictException) {
    return res.status(409).json({
      error: err.message
    })
  }
  
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error!'
  })

}

export class ConflictException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictException';
  }
}