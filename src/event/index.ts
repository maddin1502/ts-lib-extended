import type { EventArgs } from './args/index.js';
import type { EventSubscription, EventUnsubscription } from './types.js';

/**
 * Subscribable listener to certain events
 *
 * @export
 * @class Event
 * @template TSender
 * @template {EventArgs | void} [TArgs=void]
 * @since 1.0.0
 */
export class Event<TSender, TArgs extends EventArgs | void = void> {
  private _subscription:
    | undefined
    | {
        subscribe: EventSubscription<TSender, TArgs>;
        unsubscribe: EventUnsubscription;
      };

  constructor(
    subscribe_: EventSubscription<TSender, TArgs>,
    unsubscribe_: EventUnsubscription,
    detachEventProxy_: (detachEvent_: () => void) => void
  ) {
    this._subscription = {
      subscribe: subscribe_,
      unsubscribe: unsubscribe_
    };
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
    return this.validateDetached(this._subscription?.subscribe);
  }

  /**
   * unsubrcribe from event
   *
   * @readonly
   * @type {EventUnsubscription}
   * @memberof Event
   */
  public get unsubscribe(): EventUnsubscription {
    return this.validateDetached(this._subscription?.unsubscribe);
  }

  private validateDetached<T>(value_: T | undefined): T | never {
    if (value_ === undefined) {
      throw new Error('Event is detached!');
    }

    return value_;
  }

  private detach(): void {
    this._subscription = undefined;
  }
}
