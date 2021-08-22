export class EventArgs<TValue = any>  {
  constructor(
    public readonly value: TValue
  ) {}
}
