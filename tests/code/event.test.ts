import { Disposable } from '@/disposable/index.js';
import { CancelEventArgs } from '@/event/args/cancel.js';
import { EventArgs } from '@/event/args/index.js';
import { EventHandler } from '@/event/handler.js';
import { Event } from '@/event/index.js';
import { describe, expect, test } from 'vitest';

class TestSubject extends Disposable {
  private _valueChangingHandler: EventHandler<
    this,
    CancelEventArgs<[number, number]>
  >;
  private _valueChangedHandler: EventHandler<this, EventArgs<[number]>>;
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

  public get changing(): Event<this, CancelEventArgs<[number, number]>> {
    return this._valueChangingHandler.event;
  }

  public get changed(): Event<this, EventArgs<[number]>> {
    return this._valueChangedHandler.event;
  }

  public get value(): number {
    return this._value;
  }
  public set value(new_: number) {
    const cancelArgs = new CancelEventArgs(this._value, new_);
    this._valueChangingHandler.invoke(this, cancelArgs);

    if (cancelArgs.cancel) {
      return;
    }

    this._value = new_;
    this._valueChangedHandler.invoke(this, new EventArgs(new_));
  }
}

function createTestSubject(value_: number): TestSubject {
  return new TestSubject(value_);
}

describe(TestSubject.name, () => {
  test('value', () => {
    expect.assertions(27);
    const subject = createTestSubject(42);
    let changingCount = 0;
    let changedCount = 0;
    expect(
      subject.changing.subscribe('changing', (sender_, args_) => {
        expect(subject === sender_).toBe(true);
        changingCount++;
        args_.cancel = args_.args[1] === 21;
      })
    ).toBe(true);
    expect(
      subject.changed.subscribe('changed', (sender_, args_) => {
        expect(subject === sender_).toBe(true);
        changedCount++;
        expect(args_.args[0]).toBe(123456789);
      })
    ).toBe(true);

    expect(
      subject.changing.subscribe('changing', () => {
        /** */
      })
    ).toBe(false);

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

    const changingEventBeforeDispose = subject.changing;
    const changedEventBeforeDispose = subject.changed;
    subject.dispose();

    expect(() => {
      // will throw on getting "changing" event
      subject.changing.subscribe('x', () => {
        /** */
      });
    }).toThrow();
    expect(() => {
      // will throw on subscribing detached event
      changingEventBeforeDispose.subscribe('x', () => {
        /** */
      });
    }).toThrow();
    expect(() =>
      // will throw on getting "changed" event
      subject.changed.subscribe('y', () => {
        /** */
      })
    ).toThrow();
    expect(() => {
      // will throw on subscribing detached event
      changedEventBeforeDispose.subscribe('x', () => {
        /** */
      });
    }).toThrow();
    expect(() => subject.changing.unsubscribe('x')).toThrow();
    expect(() => subject.changed.unsubscribe('y')).toThrow();
  });
});
