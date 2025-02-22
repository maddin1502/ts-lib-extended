export type PublicMembers<T> = {
  [key in keyof T]: T[key];
};

export type Prettify<T> = T & unknown;
// type Prettify2<T> = T extends T ? T : T;
// type Prettify3<T> = Pick<T, keyof T>;

/**
 * recursive partial - make everthing optional
 *
 * @export
 * @template T
 * @since 4.1.0
 */
export type DeepPartial<T> = T extends object
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : T;

/**
 * recursive required - make everthing required
 *
 * @export
 * @template T
 * @since 4.1.0
 */
export type DeepRequired<T> = T extends object
  ? {
      [K in keyof T]-?: DeepRequired<T[K]>;
    }
  : T;
