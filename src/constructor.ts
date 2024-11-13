/**
 * non-abstract class constructor
 *
 * @export
 * @template [T=unknown]
 * @since 1.0.0
 */
export type StandardConstructor<T = unknown> = new (...args: any[]) => T;

/**
 * abstract class constructor
 *
 * @export
 * @template [T=unkown]
 * @since 1.0.0
 */
export type AbstractConstructor<T = unknown> = abstract new (
  ...params: any[]
) => T;

/**
 * abstract or non-abstract class constructor
 *
 * @export
 * @template [T=any]
 * @since 1.0.0
 */
export type Constructor<T = unknown> =
  | StandardConstructor<T>
  | AbstractConstructor<T>;

/**
 * Type of an instance created with a constructor
 *
 * @export
 * @template {Constructor} C
 * @since 1.0.0
 */
export type ConstructorInstance<C extends Constructor> =
  C extends StandardConstructor<infer Instance>
    ? Instance
    : C extends AbstractConstructor<infer Instance>
    ? Instance
    : never;
