export type Enumerable<T = any> = {
  [id: string]: T | string;
  [nu: number]: string;
};

export type EnumerableValue<TEnum extends Enumerable = Enumerable>
  = TEnum extends Record<infer K, infer V>
    ? K extends string
      ? V
      : never
    : never;

export type EnumerableBase<TEnumValue extends EnumerableValue>
  = TEnumValue extends string
    ? TEnumValue extends number
      ? string | number
      : string
    : TEnumValue extends number
      ? number
      : never;
