export type Dictionary<T = any, K extends string | number = string> = {
  [key in K]?: T;
}
export type ReadonlyDictionary<T = any, K extends string | number = string> = Readonly<Dictionary<T,K>>
export type DictionaryKey<D> = D extends Dictionary<any, infer P> ? P : never;
export type DictionaryValue<D> = D extends Dictionary<infer P> ? P : never;
