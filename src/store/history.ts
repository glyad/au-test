export interface StateHistory<T> {
  past: T[];
  present: T;
  future: T[];
}
