import { User } from 'modules/login/model';
import {Aurelia, autoinject} from 'aurelia-framework';
import {Router, RouterConfiguration, PipelineStep, NavigationInstruction, Redirect, Next} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import 'materialize-css';
import { connectTo, Store, ConnectToSettings } from 'aurelia-store';
import { map, pluck } from "rxjs/operators";
import { State } from 'store/state';

@connectTo<State>({
  selector: {
    user: (store: Store<State>) => store.state.pipe(<any>pluck("user"))
  },
  onChanged: "userChanged",
  target: "currentState"
})
@autoinject()
export class App {

  public user: User = null;
  public currentState: State;

  message = 'Fucking World!';

  router: Router;

  authorizeStep: AuthorizeStep;

  constructor() {
    this.authorizeStep = new AuthorizeStep();
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    
    config.title = 'au-test';

    config.addAuthorizeStep(this.authorizeStep);
        
    config.map([
        { route: ['', 'login'], name: 'login', moduleId: PLATFORM.moduleName('./modules/login/login'), nav: true, title: 'Login',  settings: { roles: ['guest'] } }
      , { route: ['shell'], name: 'shell', moduleId: PLATFORM.moduleName('./shell'), nav: true, title: 'Shell',  settings: { roles: ['authenticated'] } }      
    ]);

    this.router = router;
  }

  userChanged(newState, oldState) {
    console.log('From userChanged', newState);
    
    if (newState !== null && newState !== undefined) {
      this.authorizeStep.currentUser = newState;
      this.router.navigate('shell');
    }
  }

  
}

class AuthorizeStep implements PipelineStep {

  public currentUser: User = null;
  
  public run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
    

    console.log('Authorization - User', this.currentUser);
    

    if (this.currentUser === null && navigationInstruction.fragment.includes('login')) {
      return next();
    }

    if (   navigationInstruction.getAllInstructions().some(i => i.config.settings.roles.indexOf('authenticated') === -1)
        || this.currentUser === null      ) {
         
         return next.cancel(new Redirect('login'));
      
    }

    return next();
  }

}
