import type { EventArgs } from './args/index.js';

export type EventSubscription<
  TSender,
  TArgs extends EventArgs | void = void
> = (identifier_: string, callback_: EventCallback<TSender, TArgs>) => boolean;

export type EventUnsubscription = (identifier_: string) => boolean;

export type EventCallback<TSender, TArgs extends EventArgs | void = void> = (
  sender_: TSender,
  eventArgs_: TArgs
) => void;
