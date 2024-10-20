/**
 * determine type of array items
 *
 * @export
 * @template {IterableIterator<unknown> | ArrayLike<unknown>} T
 * @since 1.1.0
 */
export type ArrayItem<
  T extends IterableIterator<unknown> | ArrayLike<unknown>
> = T extends { [Symbol.iterator](): IterableIterator<infer P> }
  ? P
  : T extends ArrayLike<infer P>
  ? P
  : never;

type BuildMinArray<
  TItem,
  TMin extends number,
  TFix extends TItem[]
> = TFix['length'] extends TMin
  ? TFix
  : BuildMinArray<TItem, TMin, [...TFix, TItem]>;

/**
 * Array with a minimum number of items
 *
 * @export
 * @template TItem
 * @template {number} TMin
 * @since 1.1.0
 */
export type MinArray<TItem, TMin extends number> = [
  ...BuildMinArray<TItem, TMin, []>,
  ...TItem[]
];
