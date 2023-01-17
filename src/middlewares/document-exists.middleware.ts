import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import HttpError from '../common/errors/http-error.js';
import {MiddlewareInterface} from './middleware.interface.js';

interface DocumentExistsInterface {
  exists(documentId: string): Promise<boolean>;
}

export class DocumentExistsMiddleware implements MiddlewareInterface {
  constructor(private readonly service: DocumentExistsInterface,
              private readonly entityName: string,
              private readonly paramName: string) {}

  public async execute({params}: Request, _res: Response, next: NextFunction): Promise<void> {
    const documentId = params[this.paramName];
    const docExists = await this.service.exists(documentId);
    if (!docExists) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `${this.entityName} with ${documentId} not found.`,
        'DocumentExistsMiddleware'
      );
    }

    next();
  }
}
