import {GenreEnum} from '../../../types/genre.enum.js';
import {IsArray, IsDateString, IsEnum, IsInt, IsMongoId, IsString, Length, Matches, Max, Min} from 'class-validator';

export default class CreateFilmDto {
  @Length(2, 100, {message: 'title lenght must be from 2 to 100 symbols'})
  public title!: string;

  @Length(20, 1024, {message: 'description length must be from 20 to 1024 symbols'})
  public description!: string;

  @IsDateString({}, {message: 'publicationDate must be valid ISO date'})
  public publicationDate!: Date;

  @IsEnum(GenreEnum, {message: 'genre must be one of: \'comedy\',' +
      ' \'crime\', \'documentary\', \'drama\', \'horror\', \'family\', \'romance\', \'scifi\', \'thriller\''})
  public genre!: GenreEnum[];

  @IsInt({message: 'releaseYear must be an integer'})
  @Min(1895, {message: 'Minimum releaseYear is 1895'})
  @Max(2023, {message: 'Maximum releaseYear is 2023'})
  public releaseYear!: number;

  @IsString({message: 'previewPath is required'})
  public previewPath!: string;

  @IsString({message: 'moviePath is required'})
  public moviePath!: string;

  @IsArray({message: 'Field actors must be an array'})
  public actors!: string[];

  @IsString({message: 'producer is required'})
  public producer!: string;

  @IsInt({message: 'durationInMinutes must be an integer'})
  @Min(0, {message: 'durationInMinutes can not be less than 0'})
  public durationInMinutes!: number;

  @IsMongoId({message: 'userId field must be valid an id'})
  public userId!: string;

  @Matches(/(\S+(\.jpg)$)/, {message: 'posterPath must be .jpg format image'})
  @IsString({message: 'posterPath is required'})
  public posterPath!: string;

  @Matches(/(\S+(\.jpg)$)/, {message: 'backgroundImagePath must be .jpg format image'})
  @IsString({message: 'backgroundImagePath is required'})
  public backgroundImagePath!: string;

  @IsString({message: 'backgroundColor is required'})
  public backgroundColor!: string;
}
