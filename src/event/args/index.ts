/**
 * Arguments passed to an event subscription callback
 *
 * @export
 * @class EventArgs
 * @template [TValue=any]
 */
export class EventArgs<TValue = any> {
  constructor(public readonly value: TValue) {}
}
