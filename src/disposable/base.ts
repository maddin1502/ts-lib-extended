/**
 * Provides basic stuff for disposable instances
 *
 * @export
 * @abstract
 * @class DisposableBase
 */
export abstract class DisposableBase {
  protected _isDisposed: boolean;

  constructor() {
    this._isDisposed = false;
  }

  public get isDisposed(): boolean { return this._isDisposed; }

  /**
   * Dispose the instance (cleanup internals). The instance should and can no longer be used afterwards
   *
   * @return {*}  {void}
   * @memberof DisposableBase
   */
  public dispose(): void {
    if (this.isDisposed) {
      return;
    }

    this.disposingInstance();
    this._isDisposed = true;
    this.disposedInstance();
  }

  protected abstract disposingInstance(): void;

  protected abstract disposedInstance(): void;

  protected validateDisposed<T>(value_: T | undefined): T | never {
    if (this.isDisposed || value_ === undefined) {
      throw new Error('Instance is disposed!');
    }

    return value_;
  }
}
