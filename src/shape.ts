/**
 * cover functions, methods and arrow functions
 *
 * @export
 * @since 3.0.2
 */
export type MethodLike = (...args_: any[]) => unknown;

/**
 * cover all class instances, records an anonymus objects
 *
 * @alias ObjectLike (on legacy versions)
 * @export
 * @since 4.0.0
 */
export type InstanceLike = Record<PropertyKey, any> &
  (
    | {
        caller?: void;
      }
    | {
        bind?: void;
      }
    | {
        apply?: void;
      }
    | {
        call?: void;
      }
  );

/**
 * cover all types like "any" or "unknown"
 *
 * @export
 * @since 3.0.2
 */
export type AnyLike =
  | number
  | string
  | boolean
  | InstanceLike
  | MethodLike
  | undefined
  | symbol
  | null
  | ArrayLike<unknown>;
