export type StandardConstructor<T = any, A extends any[] = any[]> = new (...args: A) => T;
export type AbstractConstructor<T = any, A extends any[] = any[]> = abstract new (...params: A) => T;
export type Constructor<T = any> = StandardConstructor<T> | AbstractConstructor<T>;
export type ConstructorInstance<C extends Constructor>
  = C extends StandardConstructor<infer Instance>
    ? Instance
    : C extends AbstractConstructor<infer Instance>
      ? Instance
      : never;
export type ConstructorParameters<C extends Constructor>
  = C extends StandardConstructor<any, infer Arguments>
    ? Arguments
    : C extends AbstractConstructor<any, infer Arguments>
      ? Arguments
      : never;
