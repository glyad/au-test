import { 
  Aurelia,
  FrameworkConfiguration,
  PLATFORM
} from "aurelia-framework";
import { Store } from "aurelia-store";
import { doLogin } from "./actions";

export const MODULE_NAME = "login";

export function configure(config: FrameworkConfiguration) {
  config.globalResources(['./login']);

  const store = config.aurelia.container.get(Store);

  store.registerAction("addProductToCart", doLogin);
}
