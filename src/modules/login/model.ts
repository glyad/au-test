import { IModel, Model } from 'logofx';
import { ValidationRules } from 'aurelia-validation';

export interface IUser extends IModel<number> {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ILogin extends IModel<number> {
  login: string;
  password: string;
}

export class User extends Model<number>  implements IUser {
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
}

export class Login extends Model<number> implements ILogin {
  public login: string = '';  
  public password: string = '';

  constructor () {
    super();

    this.rules = ValidationRules
        .ensure((l: Login) => l.login).displayName('Login').required().withMessage('The value is mandatory')
        .ensure((l:Login) => l.login).displayName('Login').email()
        .ensure((l:Login) => l.password).displayName('Password').required().withMessage('The value is mandatory')
        .rules;
  }
}
