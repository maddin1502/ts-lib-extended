import { EventHandler } from '../event/handler.js';
import type { Event } from '../event/index.js';
import { DisposableBase } from './base.js';

/**
 * Core for disposable instances
 *
 * @export
 * @class Disposable
 * @extends {DisposableBase}
 * @since 1.0.0
 */
export class Disposable extends DisposableBase {
  private _disposingHandler: EventHandler<this>;
  private _disposedHandler: EventHandler<this>;
  protected _disposers: (() => void)[];

  constructor() {
    super();
    this._disposers = [];
    this._disposingHandler = new EventHandler<this>();
    this._disposedHandler = new EventHandler<this>();
  }

  /**
   * Event that is invoked before the instance is disposed
   *
   * @readonly
   * @type {Event<this>}
   * @memberof Disposable
   * @since 1.0.0
   */
  public get disposing(): Event<this> {
    return this._disposingHandler.event;
  }

  /**
   * Event that is invoked after the instance is disposed
   *
   * @readonly
   * @type {Event<this>}
   * @memberof Disposable
   * @since 1.0.0
   */
  public get disposed(): Event<this> {
    return this._disposedHandler.event;
  }

  protected disposingInstance(): void {
    this._disposingHandler.invoke(this);
    this._disposingHandler.dispose();

    for (let i = 0; i < this._disposers.length; i++) {
      this._disposers[i]();
    }
  }

  protected disposedInstance(): void {
    this._disposedHandler.invoke(this);
    this._disposedHandler.dispose();
  }
}
