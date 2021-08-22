import { Event } from '../event';
import { EventHandler } from '../event/handler';
import { DisposableBase } from './base';

export class Disposable extends DisposableBase
{
  private _disposingHandler: EventHandler<this>;
  private _disposedHandler: EventHandler<this>;
  protected _disposers: (() => void)[];

  constructor() {
    super();
    this._disposers = [];
    this._disposingHandler = new EventHandler<this>();
    this._disposedHandler = new EventHandler<this>();
  }

  public get disposing(): Event<this> { return this._disposingHandler.event; }

  public get disposed(): Event<this> { return this._disposedHandler.event; }

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
