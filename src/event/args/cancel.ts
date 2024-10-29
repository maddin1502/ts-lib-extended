import { EventArgs } from './index.js';

/**
 * EventArgs that can be used to cancel the execution of an event
 *
 * @export
 * @class CancelEventArgs
 * @template {unknown[]} [TArgs=unknown[]]
 * @extends {EventArgs<TArgs>}
 * @since 1.0.0
 */
export class CancelEventArgs<
  TArgs extends unknown[] = unknown[]
> extends EventArgs<TArgs> {
  constructor(...args_: TArgs) {
    super(...args_);
    this.cancel = false;
  }

  public cancel: boolean;
}
