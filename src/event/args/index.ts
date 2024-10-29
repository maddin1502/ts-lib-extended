/**
 * Arguments passed to an event subscription callback
 *
 * @export
 * @class EventArgs
 * @template {unknown[]} [TArgs=unknown[]]
 * @since 1.0.0
 */
export class EventArgs<TArgs extends unknown[] = unknown[]> {
  private _args: TArgs;

  constructor(...args_: TArgs) {
    this._args = args_;
  }

  /**
   * passed arguments
   *
   * @public
   * @readonly
   * @type {TArgs}
   * @since 4.0.0
   */
  public get args(): TArgs {
    return this._args;
  }
}
