/**
 * Arguments passed to an event subscription callback
 *
 * @export
 * @class EventArgs
 * @template {unknown[]} [TValue=unknown[]]
 * @since 1.0.0
 */
export class EventArgs<TValue extends unknown[] = unknown[]> {
  private _args: TValue;

  constructor(...args_: TValue) {
    this._args = args_;
  }

  /**
   * passed arguments
   *
   * @public
   * @readonly
   * @type {TValue}
   * @since 4.0.0
   */
  public get args(): TValue {
    return this._args;
  }
}
