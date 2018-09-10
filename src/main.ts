/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>
// we want font-awesome to load as soon as possible to show the fa-spinner
import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import {PLATFORM} from 'aurelia-pal';
import * as Bluebird from 'bluebird';
import 'materialize-css';
import { initialState } from 'store/state';

// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-materialize-bridge'), bridge => bridge.useAll())
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('aurelia-store'), {
      initialState,
      // history: {
      //   undoable: true,
      //   limit: 16 
      // },
      propagateError: true
    })
    .feature(PLATFORM.moduleName('logofx/index'))
    .feature(PLATFORM.moduleName('resources/index'))
    .feature(PLATFORM.moduleName('modules/login/index'))
    .feature(PLATFORM.moduleName('modules/dashboard/index'));

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }  
    

  return aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
