export type PublicMembers<T> = {
  [key in keyof T]: T[key];
}
