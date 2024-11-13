import type { EventArgs } from './args/index.js';

/**
 * Event subscriber
 *
 * @export
 * @template TSender
 * @template {EventArgs | void} [TArgs=void]
 * @since 1.0.0
 */
export type EventSubscription<
  TSender,
  TArgs extends EventArgs | void = void
> = (identifier_: string, callback_: EventCallback<TSender, TArgs>) => boolean;

/**
 * Event unsubscriber
 *
 * @export
 * @since 1.0.0
 */
export type EventUnsubscription = (identifier_: string) => boolean;

/**
 * Event subscription callback that is triggered when event is invoked
 *
 * @export
 * @template TSender
 * @template {EventArgs | void} [TArgs=void]
 * @since 1.0.0
 */
export type EventCallback<TSender, TArgs extends EventArgs | void = void> = (
  sender_: TSender,
  eventArgs_: TArgs
) => void;
