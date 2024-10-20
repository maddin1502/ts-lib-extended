/**
 * @export
 * @template {unknown[]} [T=never[]]
 * @since 3.0.2
 */
export type MethodLike<T extends unknown[] = never[]> = (
  ...args_: T
) => unknown;
/**
 * @export
 * @since 3.0.2
 */
export type ObjectLike = Record<PropertyKey, unknown>;
/**
 * @export
 * @since 3.0.2
 */
export type AnyLike =
  | number
  | string
  | boolean
  | ObjectLike
  | MethodLike
  | undefined
  | symbol
  | null;
