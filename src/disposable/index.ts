import type { Event } from '../event';
import { EventHandler } from '../event/handler';
import { DisposableBase } from './base';

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

  public get disposing(): Event<Disposable> { return this._disposingHandler.event; }

  public get disposed(): Event<Disposable> { return this._disposedHandler.event; }

  protected disposingInstance(): void {
    this._disposingHandler.invoke(this);
    this._disposingHandler.dispose();

    for (const disposer of this._disposers) {
      disposer();
    }
  }

  protected disposedInstance(): void {
    this._disposedHandler.invoke(this);
    this._disposedHandler.dispose();
  }
}
