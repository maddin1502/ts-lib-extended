import { Event } from '.';
import { Dictionary } from '../dictionary';
import { Disposable } from '../disposable';
import { DisposableBase } from '../disposable/base';
import { EventArgs } from './args';
import { EventCallback } from './types';

export class EventHandler<TSender extends Disposable, TArgs extends EventArgs | void = void> extends DisposableBase {
  private _callbacks: Dictionary<EventCallback<TSender, TArgs>>;
  private _event: Event<TSender, TArgs> | undefined;
  private _detachEvent: (() => void) | undefined;

  constructor() {
    super();
    this._callbacks = {};
    this._event = new Event(
      (...args_) => this.subscribe(...args_),
      (...args_) => this.unsubscribe(...args_),
      detachEvent_ => {
        this._detachEvent = detachEvent_;
      }
    );
  }

  public get event(): Event<TSender, TArgs> {
    return this.validateDisposed(this._event);
  }

  public invoke(sender_: TSender, eventArgs_: TArgs): void {
    const keys = Object.keys(this._callbacks);

    for (let i = 0; i < keys.length; i++) {
      this._callbacks[keys[i]]?.(sender_, eventArgs_);
    }
  }

  private subscribe(identifier_: string, callback_: EventCallback<TSender, TArgs>): boolean {
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

  // TODO: use generator for callback keys?
}
