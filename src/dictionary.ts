/**
 * safe dictionary (values are always optional)
 *
 * @export
 * @template [T=unknown]
 * @template {string | number} [K=string]
 * @since 1.0.0
 */
export type Dictionary<T = unknown, K extends string | number = string> = {
  [key in K]?: T;
};

/**
 * readonly safe dictionary
 *
 * @export
 * @template [T=unknown]
 * @template {string | number} [K=string]
 * @since 1.0.0
 */
export type ReadonlyDictionary<
  T = unknown,
  K extends string | number = string
> = Readonly<Dictionary<T, K>>;

/**
 * type of dictionary keys
 *
 * @export
 * @template D
 * @since 1.0.0
 */
export type DictionaryKey<D> = D extends Dictionary<unknown, infer P>
  ? P
  : never;

/**
 * type of dictionary keys
 *
 * @export
 * @template D
 * @since 1.0.0
 */
export type DictionaryValue<D> = D extends Dictionary<infer P> ? P : never;
