import { EnumerableObject } from './enumerable';

export type { ArrayItem, MinArray } from './array';
export type {
  AbstractConstructor,
  Constructor,
  ConstructorInstance,
  ConstructorParameters,
  StandardConstructor
} from './constructor';
export type {
  Dictionary,
  DictionaryKey,
  DictionaryValue,
  ReadonlyDictionary
} from './dictionary';
export { Disposable } from './disposable';
export { DisposableBase } from './disposable/base';
export type {
  Enumerable,
  EnumerableBase,
  EnumerableEntry,
  EnumerableValue
} from './enumerable';
export { Event } from './event';
export { EventArgs } from './event/args';
export { CancelEventArgs } from './event/args/cancel';
export { EventHandler } from './event/handler';
export type {
  EventCallback,
  EventSubscription,
  EventUnsubscription
} from './event/types';
export type { PublicMembers } from './mapping';
export { EnumerableObject };

export const enumerableObject = new EnumerableObject();
