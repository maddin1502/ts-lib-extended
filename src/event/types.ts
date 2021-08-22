import { Disposable } from '../disposable';
import { EventArgs } from './args';

export type EventSubscription<
  TSender extends Disposable,
  TArgs extends EventArgs | void = void
> = (identifier_: string, callback_: EventCallback<TSender, TArgs>) => boolean;

export type EventUnsubscription = (identifier_: string) => boolean;

export type EventCallback<
  TSender extends Disposable,
  TArgs extends EventArgs | void = void
> = (sender_: TSender, eventArgs_: TArgs) => void;
