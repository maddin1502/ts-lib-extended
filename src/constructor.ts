/**
 * non-abstract class constructor
 *
 * @export
 * @template [T=unknown]
 * @template {unknown[]} [A=unknown[]]
 * @since 1.0.0
 */
export type StandardConstructor<
  T = unknown,
  A extends unknown[] = unknown[]
> = new (...args: A) => T;

/**
 * abstract class constructor
 *
 * @export
 * @template [T=unknown]
 * @template {unknown[]} [A=unknown[]]
 * @since 1.0.0
 */
export type AbstractConstructor<
  T = unknown,
  A extends unknown[] = unknown[]
> = abstract new (...params: A) => T;

/**
 * abstract or non-abstract class constructor
 *
 * @export
 * @template [T=unknown]
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

/**
 * Required parameters to create an instance with a constructor
 *
 * @export
 * @template {Constructor} C
 * @since 1.0.0
 */
export type ConstructorParameters<C extends Constructor> =
  C extends StandardConstructor<unknown, infer Arguments>
    ? Arguments
    : C extends AbstractConstructor<unknown, infer Arguments>
    ? Arguments
    : never;
