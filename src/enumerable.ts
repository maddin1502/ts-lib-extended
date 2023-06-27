export type Enumerable<T = any> = {
  [id: string]: T | string;
  [nu: number]: string;
};

export type EnumerableValue<TEnum extends Enumerable = Enumerable> =
  TEnum extends Record<infer K, infer V>
    ? K extends string
      ? V
      : never
    : never;

export type EnumerableBase<TEnumValue extends EnumerableValue> =
  TEnumValue extends string
    ? TEnumValue extends number
      ? string | number
      : string
    : TEnumValue extends number
    ? number
    : never;

export type EnumerableEntry<E extends Enumerable> = [
  keyof E,
  EnumerableValue<E>
];

/**
 * Gain keys and values from enum instances. Works with string, numeric and mixed enums
 * (properly ignoring the numeric index reverse lookup entries for numeric enums)
 *
 * @export
 * @class EnumerableObject
 */
export class EnumerableObject {
  /**
   * Gain enum values (equivalent to Object.values(...))
   *
   * @template E
   * @param {E} enum_
   * @return {*}  {ReadonlyArray<EnumerableValue<E>>}
   * @memberof EnumerableObject
   */
  public values<E extends Enumerable>(
    enum_: E
  ): ReadonlyArray<EnumerableValue<E>> {
    const values: EnumerableValue<E>[] = [];

    this.disassemble(enum_, (key_) =>
      values.push(enum_[key_] as EnumerableValue<E>)
    );

    return values;
  }

  /**
   * Gain enum keys (equivalent to Object.keys(...))
   *
   * @template E
   * @param {E} enum_
   * @return {*}  {ReadonlyArray<keyof E>}
   * @memberof EnumerableObject
   */
  public keys<E extends Enumerable>(enum_: E): ReadonlyArray<keyof E> {
    const keys: (keyof E)[] = [];

    this.disassemble(enum_, (key_) => keys.push(key_));

    return keys;
  }

  /**
   * Gain enum entries (equivalent to Object.entries(...))
   *
   * @template E
   * @param {E} enum_
   * @return {*}  {ReadonlyArray<EnumerableEntry<E>>}
   * @memberof EnumerableObject
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
