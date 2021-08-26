export type ArrayItem<T extends IterableIterator<any> | ArrayLike<any>>
  = T extends { [Symbol.iterator](): IterableIterator<infer P>; }
    ? P
    : T extends ArrayLike<infer P>
      ? P
      : never;

type BuildMinArray<TItem, TMin extends number, TFix extends TItem[]>
  = TFix['length'] extends TMin
    ? TFix
    : BuildMinArray<TItem, TMin, [...TFix, TItem]>;
export type MinArray<TItem, TMin extends number> = [...BuildMinArray<TItem, TMin, []>, ...TItem[]];
