export type PublicMembers<T> = {
  [key in keyof T]: T[key];
};

export type Prettify<T> = T & unknown;
// type Prettify2<T> = T extends T ? T : T;
// type Prettify3<T> = Pick<T, keyof T>;
