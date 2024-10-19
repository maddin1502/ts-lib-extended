export type StandardConstructor<
  T = unknown,
  A extends unknown[] = unknown[]
> = new (...args: A) => T;
export type AbstractConstructor<
  T = unknown,
  A extends unknown[] = unknown[]
> = abstract new (...params: A) => T;
export type Constructor<T = unknown> =
  | StandardConstructor<T>
  | AbstractConstructor<T>;
export type ConstructorInstance<C extends Constructor> =
  C extends StandardConstructor<infer Instance>
    ? Instance
    : C extends AbstractConstructor<infer Instance>
    ? Instance
    : never;
export type ConstructorParameters<C extends Constructor> =
  C extends StandardConstructor<unknown, infer Arguments>
    ? Arguments
    : C extends AbstractConstructor<unknown, infer Arguments>
    ? Arguments
    : never;
