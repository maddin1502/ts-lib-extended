import type { Disposable } from '../disposable';
import type { PublicMembers } from '../mapping';
import type { EventArgs } from './args';
import type { EventSubscription, EventUnsubscription } from './types';

/**
 * Subscribable listener to certain events
 *
 * @export
 * @class Event
 * @template TSender
 * @template TArgs
 */
export class Event<TSender extends PublicMembers<Disposable>, TArgs extends EventArgs | void = void> {
  private _detached: boolean;
  private _subscribe: EventSubscription<TSender, TArgs> | undefined;
  private _unsubscribe: EventUnsubscription | undefined;

  constructor(
    subscribe_: EventSubscription<TSender, TArgs>,
    unsubscrbe_: EventUnsubscription,
    detachEventProxy_: (detachEvent_: () => void) => void
  ) {
    this._detached = false;
    this._subscribe = subscribe_;
    this._unsubscribe = unsubscrbe_;
    detachEventProxy_(() => this.detach());
  }

  /**
   * subrcribe to event
   *
   * @readonly
   * @type {EventSubscription<TSender, TArgs>}
   * @memberof Event
   */
  public get subscribe(): EventSubscription<TSender, TArgs> {
    return this.validateDetached(this._subscribe);
  }

  /**
   * unsubrcribe from event
   *
   * @readonly
   * @type {EventUnsubscription}
   * @memberof Event
   */
  public get unsubscribe(): EventUnsubscription {
    return this.validateDetached(this._unsubscribe);
  }

  private validateDetached<T>(value_: T | undefined): T | never {
    if (this._detached || value_ === undefined) {
      throw new Error('Event is detached!');
    }

    return value_;
  }

  private detach(): void {
    this._detached = true;
    this._subscribe = undefined;
    this._unsubscribe = undefined;
  }
}
