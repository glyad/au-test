import { State } from "./state";

export function logout(state: State) {
  return Object.assign({}, state, {
    user: null
  });
}
