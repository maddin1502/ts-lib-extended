/**
 * cover functions, methods and arrow functions
 *
 * @export
 * @since 3.0.2
 */
export type MethodLike = (...args_: any[]) => unknown;

type NotAFunction =
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
    };

/**
 * cover all class instances, records, anonymus objects and arrays
 *
 * @alias ObjectLike (on legacy versions)
 * @export
 * @since 4.0.0
 */
export type InstanceLike = Record<PropertyKey, any> & NotAFunction;

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
