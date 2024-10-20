import { EnumerableObject } from './enumerable.js';

export type * from '@/shape.js';
export type { ArrayItem, MinArray } from './array.js';
export type {
  AbstractConstructor,
  Constructor,
  ConstructorInstance,
  ConstructorParameters,
  StandardConstructor
} from './constructor.js';
export type {
  Dictionary,
  DictionaryKey,
  DictionaryValue,
  ReadonlyDictionary
} from './dictionary.js';
export { DisposableBase } from './disposable/base.js';
export { Disposable } from './disposable/index.js';
export type { EmptyObject } from './emptyObject.js';
export type {
  Enumerable,
  EnumerableBase,
  EnumerableEntry
} from './enumerable.js';
export { CancelEventArgs } from './event/args/cancel.js';
export { EventArgs } from './event/args/index.js';
export { EventHandler } from './event/handler.js';
export { Event } from './event/index.js';
export type {
  EventCallback,
  EventSubscription,
  EventUnsubscription
} from './event/types.js';
export type { PublicMembers } from './mapping.js';
export { EnumerableObject };

export const enumerableObject = new EnumerableObject();
