import type { Prettify } from './mapping.js';

/**
 * enum type representation
 *
 * ```ts
 * enum MyEnum { a, b }
 *
 * function doMagic(enum: Enumerable): void { ... }
 *
 * doMagic(MyEnum)
 * ```
 *
 * @export
 * @since 1.0.0
 */
export type Enumerable = {
  [id: string]: number | string;
  [nu: number]: string;
};

/**
 * enum values type
 *
 * ```
 * enum MyEnum { a, b }
 * EnumerableValue<typeof MyEnum> => MyEnum.a | MyEnum.b
 * ```
 *
 * @export
 * @template {Enumerable} TEnum
 * @since 1.1.5
 */
export type EnumerableValue<TEnum extends Enumerable> = Prettify<
  TEnum[keyof TEnum]
>;

/**
 * enum values base type
 *
 * ```
 * String Enum => string
 * Numeric Enum => number
 * Heterogeneous Enum => string | number
 * ```
 *
 * @export
 * @template {EnumerableValue<Enumerable>} TEnumValue
 * @since 1.1.5
 */
export type EnumerableBase<TEnumValue extends EnumerableValue<Enumerable>> =
  TEnumValue extends string
    ? TEnumValue extends number
      ? string | number
      : string
    : TEnumValue extends number
    ? number
    : never;

/**
 * tuple of enum key and associated value
 *
 * @export
 * @template {Enumerable} E
 * @since 1.2.0
 */
export type EnumerableEntry<E extends Enumerable> = {
  [key in keyof E]: [key, E[key]];
} extends Record<PropertyKey, infer P>
  ? Exclude<P, [number, string]>
  : never;

/**
 * Gain keys and values from enum instances. Works with string, numeric and mixed enums
 * (properly ignoring the numeric index reverse lookup entries for numeric enums)
 *
 * @export
 * @class EnumerableObject
 * @since 1.2.0
 */
export class EnumerableObject {
  /**
   * Gain enum values (equivalent to Object.values(...))
   *
   * @public
   * @template {Enumerable} E
   * @param {E} enum_
   * @returns {ReadonlyArray<EnumerableValue<E>>}
   * @since 1.2.0
   */
  public values<E extends Enumerable>(
    enum_: E
  ): ReadonlyArray<EnumerableValue<E>> {
    const values: EnumerableValue<E>[] = [];

    this.disassemble(enum_, (key_) => values.push(enum_[key_]));

    return values;
  }

  /**
   * Gain enum keys (equivalent to Object.keys(...))
   *
   * @public
   * @template {Enumerable} E
   * @param {E} enum_
   * @returns {ReadonlyArray<keyof E>}
   * @since 1.2.0
   */
  public keys<E extends Enumerable>(enum_: E): ReadonlyArray<keyof E> {
    const keys: (keyof E)[] = [];

    this.disassemble(enum_, (key_) => keys.push(key_));

    return keys;
  }

  /**
   * Gain enum entries (equivalent to Object.entries(...))
   *
   * @public
   * @template {Enumerable} E
   * @param {E} enum_
   * @returns {ReadonlyArray<EnumerableEntry<E>>}
   * @since 1.2.0
   */
  public entries<E extends Enumerable>(
    enum_: E
  ): ReadonlyArray<EnumerableEntry<E>> {
    const entries: EnumerableEntry<E>[] = [];

    this.disassemble(enum_, (key_) =>
      entries.push([key_, enum_[key_]] as EnumerableEntry<E>)
    );

    return entries;
  }

  private disassemble<E extends Enumerable>(
    enum_: E,
    processKey_: (key_: keyof E) => void
  ): void {
    const keys = Object.keys(enum_);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (/^[0-9]+$/.exec(key)) {
        continue;
      }

      processKey_(key);
    }
  }
}
