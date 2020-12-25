import express from 'express';
import { ExpressJoiError } from 'express-joi-validation';
import { ContainerTypes } from './containerTypes';

export function response(
  err: any | ExpressJoiError,
  _req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: express.NextFunction
): void {
  if (err && Object.values(ContainerTypes).includes(err.type)) {
    const e: ExpressJoiError = err;
    res.status(400).json(e);
  } else {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).send(err);
    }
  }
}
