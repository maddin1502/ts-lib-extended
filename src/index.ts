import { EnumerableObject } from './enumerable.js';

export type * from './array.js';
export type * from './constructor.js';
export type * from './dictionary.js';
export { DisposableBase } from './disposable/base.js';
export { Disposable } from './disposable/index.js';
export type * from './emptyObject.js';
export type * from './enumerable.js';
export { CancelEventArgs } from './event/args/cancel.js';
export { EventArgs } from './event/args/index.js';
export { EventHandler } from './event/handler.js';
export { Event } from './event/index.js';
export type * from './event/types.js';
export type * from './mapping.js';
export type * from './shape.js';
export { EnumerableObject };

export const enumerableObject = new EnumerableObject();
