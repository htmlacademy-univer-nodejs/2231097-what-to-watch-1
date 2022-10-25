import {DocumentType, types} from '@typegoose/typegoose';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {FilmServiceInterface} from './film-service.interface.js';
import {FilmEntity} from './film.entity.js';
import CreateFilmDto from './dto/create-film.js';

@injectable()
export default class FilmService implements FilmServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.FilmModel) private readonly filmModel: types.ModelType<FilmEntity>,
  ) {}

  async create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>> {
    const movie = await this.filmModel.create(dto);
    this.logger.info(`New movie created: ${dto.name}`);

    return movie;
  }

  async findById(movieId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findById(movieId).exec();
  }
}