import { MaterializeFormValidationRenderer } from 'aurelia-materialize-bridge';
import { ILogin } from './model';
import { ObjectViewModel } from "logofx";
import { connectTo, dispatchify } from 'aurelia-store';
import { autoinject } from 'aurelia-framework';
import { doLogin } from './actions';

@connectTo()
@autoinject()
export class Login  extends ObjectViewModel<ILogin> {

  constructor(model: ILogin){
    super(model);

    this.controller.addRenderer(new MaterializeFormValidationRenderer());
  }

  // login(model: any) {

  //   console.log(model.login);
  // }
  public login = dispatchify(doLogin);

}
