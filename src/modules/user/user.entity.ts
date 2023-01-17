import {User} from '../../types/user.type.js';
import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import {createSHA256} from '../../utils/hash-generator.js';
import {UserPasswordEnum} from '../../types/user-password.enum.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(data: User) {
    super();

    this.email = data.email;
    this.avatarPath = data.avatarPath;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }

  @prop({ unique: true, required: true })
  public email!: string;

  @prop({required: true, default: ''})
  public avatarPath!: string;

  @prop({required: true, default: ''})
  public firstName!: string;

  @prop({required: true, default: ''})
  public lastName!: string;

  @prop({required: true, default: []})
  public filmsToWatch!: string[];

  @prop({required: true})
  private password!: string;

  public setPassword(password: string, salt: string) {
    if (password.length < UserPasswordEnum.MINIMAL || password.length > UserPasswordEnum.MAXIMUM){
      throw new Error('Password must be from 6 to 12 characters.');
    }
    this.password = createSHA256(password, salt);
  }

  public verifyPassword(passwd: string, salt: string) {
    return createSHA256(passwd, salt) === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
