import {NextFunction, Request, Response} from 'express';
import {HttpMethod} from '../../types/http-method.enum.js';
import {MiddlewareInterface} from '../../middlewares/middleware.interface.js';

export interface RouteInterface<Path extends string> {
  path: Path;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: MiddlewareInterface[];
}
