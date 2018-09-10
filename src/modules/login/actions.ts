import { ILogin, IUser, User } from "./model";
import { State } from "store/state";
import { MODULE_NAME } from ".";


export function doLogin(state: State, login: ILogin)
{
  console.log('Action doLogin');

  return Object.assign({}, state, <State>{
    
    user: <IUser> {
      firstName: 'Vasya',
      lastName: 'Petin',
      email: 'vasya@gmail.com'
    }
    
  });
}
