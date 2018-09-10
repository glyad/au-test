import { IUser, User } from "modules/login/model";

export interface State {

        // extendable state slices
        [slice: string]: StateSlice & any;

        user: User;

}

export interface StateSlice {



}

export const initialState: State = {
  user: null
};
