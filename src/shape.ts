export type MethodLike = (...args_: any[]) => any;
export type ObjectLike = Record<PropertyKey, any>;
export type AnyLike =
  | number
  | string
  | boolean
  | ObjectLike
  | MethodLike
  | undefined
  | symbol
  | null;
