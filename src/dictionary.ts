export type Dictionary<T = unknown, K extends string | number = string> = {
  [key in K]?: T;
};
export type ReadonlyDictionary<
  T = unknown,
  K extends string | number = string
> = Readonly<Dictionary<T, K>>;
export type DictionaryKey<D> = D extends Dictionary<unknown, infer P>
  ? P
  : never;
export type DictionaryValue<D> = D extends Dictionary<infer P> ? P : never;
