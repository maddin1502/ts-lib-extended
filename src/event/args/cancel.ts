import { EventArgs } from '.';

/**
 * EventArgs that can be used to cancel the execution of an event
 *
 * @export
 * @class CancelEventArgs
 * @extends {EventArgs<TValue>}
 * @template TValue
 */
export class CancelEventArgs<TValue = any> extends EventArgs<TValue> {
  constructor(value_: TValue) {
    super(value_);
    this.cancel = false;
  }

  public cancel: boolean;
}
