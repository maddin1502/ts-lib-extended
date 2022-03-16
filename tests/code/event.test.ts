import { Disposable } from '../../src/disposable';
import { Event } from '../../src/event';
import { EventArgs } from '../../src/event/args';
import { CancelEventArgs } from '../../src/event/args/cancel';
import { EventHandler } from '../../src/event/handler';

class TestSubject extends Disposable {
  private _valueChangingHandler: EventHandler<this, CancelEventArgs<{ old: number, new: number }>>;
  private _valueChangedHandler: EventHandler<this, EventArgs<number>>;
  private _value: number;

  constructor(initValue_: number) {
    super();
    this._value = initValue_;
    this._valueChangingHandler = new EventHandler();
    this._valueChangedHandler = new EventHandler();
    this._disposers.push(() => {
      this._valueChangingHandler.dispose();
      this._valueChangedHandler.dispose();
    });
  }

  public get changing(): Event<this, CancelEventArgs<{ old: number, new: number }>> { return this._valueChangingHandler.event; }

  public get changed(): Event<this, EventArgs<number>> { return this._valueChangedHandler.event; }

  public get value(): number { return this._value; }
  public set value(new_: number) {
    const cancelArgs = new CancelEventArgs<{ old: number, new: number }>({ old: this._value, new: new_ });
    this._valueChangingHandler.invoke(this, cancelArgs);

    if (cancelArgs.cancel) {
      return;
    }

    this._value = new_;
    this._valueChangedHandler.invoke(this, new EventArgs<number>(new_));
  }
}

function createTestSubject(value_: number): TestSubject {
  return new TestSubject(value_);
}

describe(TestSubject, () => {
  test('value', () => {
    expect.assertions(25);
    const subject = createTestSubject(42);
    let changingCount = 0;
    let changedCount = 0;
    expect(subject.changing.subscribe('changing', (sender_, args_) => {
      expect(subject === sender_).toBe(true);
      changingCount++;
      args_.cancel = args_.value.new === 21;
    })).toBe(true);
    expect(subject.changed.subscribe('changed', (sender_, args_) => {
      expect(subject === sender_).toBe(true);
      changedCount++;
      expect(args_.value).toBe(123456789);
    })).toBe(true);

    expect(subject.changing.subscribe('changing', () => { /** */ })).toBe(false);

    expect(changingCount).toBe(0);
    expect(changedCount).toBe(0);
    subject.value = 21; // should be canceled
    expect(subject.value).toBe(42);
    expect(changingCount).toBe(1);
    expect(changedCount).toBe(0);

    subject.value = 123456789;
    expect(changingCount).toBe(2);
    expect(changedCount).toBe(1);
    expect(subject.value).toBe(123456789);

    expect(subject.changing.unsubscribe('changing')).toBe(true);
    expect(subject.changed.unsubscribe('changed')).toBe(true);
    expect(subject.changed.unsubscribe('changed')).toBe(false);
    subject.value = 21; // should NOT be canceled, events are unsubscribed
    expect(changingCount).toBe(2);
    expect(changedCount).toBe(1);
    expect(subject.value).toBe(21);

    subject.dispose();

    expect(() => subject.changing.subscribe('x', () => { /** */ })).toThrow();
    expect(() => subject.changed.subscribe('y', () => { /** */ })).toThrow();
    expect(() => subject.changing.unsubscribe('x')).toThrow();
    expect(() => subject.changed.unsubscribe('y')).toThrow();
  });
});
