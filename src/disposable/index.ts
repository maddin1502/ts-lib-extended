import type { Event } from '../event';
import { EventHandler } from '../event/handler';
import { DisposableBase } from './base';

/**
 * Core for disposable instances
 *
 * @export
 * @class Disposable
 * @extends {DisposableBase}
 */
export class Disposable extends DisposableBase
{
  private _disposingHandler: EventHandler<Disposable>;
  private _disposedHandler: EventHandler<Disposable>;
  protected _disposers: (() => void)[];

  constructor() {
    super();
    this._disposers = [];
    this._disposingHandler = new EventHandler<Disposable>();
    this._disposedHandler = new EventHandler<Disposable>();
  }

  /**
   * Event that is invoked before the instance is disposed
   *
   * @readonly
   * @type {Event<Disposable>}
   * @memberof Disposable
   */
  public get disposing(): Event<Disposable> { return this._disposingHandler.event; }

  /**
   * Event that is invoked after the instance is disposed
   *
   * @readonly
   * @type {Event<Disposable>}
   * @memberof Disposable
   */
  public get disposed(): Event<Disposable> { return this._disposedHandler.event; }

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
