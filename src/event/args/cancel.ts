import { EventArgs } from '.';

export class EventCancelArgs<TValue> extends EventArgs<TValue> {
  constructor(value_: TValue) {
    super(value_);
    this.cancel = false;
  }

  public cancel: boolean;
}
