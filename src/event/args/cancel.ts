import { EventArgs } from './index.js';

/**
 * EventArgs that can be used to cancel the execution of an event
 *
 * @export
 * @class CancelEventArgs
 * @template {unknown[]} [TValue=unknown[]]
 * @extends {EventArgs<TValue>}
 * @since 1.0.0
 */
export class CancelEventArgs<
  TValue extends unknown[] = unknown[]
> extends EventArgs<TValue> {
  constructor(...args_: TValue) {
    super(...args_);
    this.cancel = false;
  }

  public cancel: boolean;
}
