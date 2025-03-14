import type { Dictionary } from '../dictionary.js';
import { DisposableBase } from '../disposable/base.js';
import type { EventArgs } from './args/index.js';
import { Event } from './index.js';
import type { EventCallback } from './types.js';

/**
 * A handler that provides subscribable, public events.
 * The handler is intended for internal (protected, private) use
 *
 * @export
 * @class EventHandler
 * @template TSender
 * @template {EventArgs | void} [TArgs=void]
 * @extends {DisposableBase}
 * @since 1.0.0
 */
export class EventHandler<
  TSender,
  TArgs extends EventArgs | void = void
> extends DisposableBase {
  private _callbacks: Dictionary<EventCallback<TSender, TArgs>>;
  private _event: Event<TSender, TArgs> | undefined;
  private _detachEvent: (() => void) | undefined;

  constructor() {
    super();
    this._callbacks = {};
    this._event = new Event(
      (...args_) => this.subscribe(...args_),
      (...args_) => this.unsubscribe(...args_),
      (detachEvent_) => {
        this._detachEvent = detachEvent_;
      }
    );
  }

  /**
   * the subscribable event itself
   *
   * @readonly
   * @type {Event<TSender, TArgs>}
   * @memberof EventHandler
   * @since 1.0.0
   */
  public get event(): Event<TSender, TArgs> {
    return this.validateDisposed(this._event);
  }

  /**
   * trigger/invoke event
   *
   * @param {TSender} sender_
   * @param {TArgs} eventArgs_
   * @memberof EventHandler
   * @since 1.0.0
   */
  public invoke(sender_: TSender, eventArgs_: TArgs): void {
    const keys = Object.keys(this._callbacks);

    for (let i = 0; i < keys.length; i++) {
      this._callbacks[keys[i]]?.(sender_, eventArgs_);
    }
  }

  private subscribe(
    identifier_: string,
    callback_: EventCallback<TSender, TArgs>
  ): boolean {
    if (identifier_ in this._callbacks) {
      return false;
    }

    this._callbacks[identifier_] = callback_;
    return true;
  }

  private unsubscribe(identifier_: string): boolean {
    if (identifier_ in this._callbacks) {
      delete this._callbacks[identifier_];
      return true;
    }

    return false;
  }

  protected disposingInstance(): void {
    if (this._detachEvent) {
      this._detachEvent();
      this._detachEvent = undefined;
    }

    this._event = undefined;
    const keys = Object.keys(this._callbacks);

    for (let i = 0; i < keys.length; i++) {
      delete this._callbacks[keys[i]];
    }
  }

  protected disposedInstance(): void {
    /** there is nothing to do */
  }
}
