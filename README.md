# typescript-lib-extended
> Additional types for typescript

## Features
- Enum type
- Dictionary types (safe, readonly, key + value types)
- Constructor types (abstract, standard, parameter + instance types)
- Core class for disposable instances
- Events (handler, args)

## Installation
```bash
npm i ts-lib-extended
```
or
```bash
yarn add ts-lib-extended
```

## Events

With events it is possible to subscribe to specific action or change on an instance.
This is inspired by C# and should work in a similar way.

```ts
import { Event, EventArgs, Disposable, EventHandler } from 'ts-lib-extended':

export class Example<T> extends Disposable {
  private _valueChangedHandler: EventHandler<this, EventArgs<T>>;

  constructor(
    private _value: T
  ) {
    super();
    // create handler that provides the subscribable event
    this._valueChangedHandler = new EventHandler();
  }

  public get value(): T { return this._value; }
  public set value(value_: T) {
    this._value = value_;
    this._valueChangedHandler.invoke(this, new EventArgs(value_));
  }

  public get valueChanged(): Event<this, EventArgs<T>> { return this._valueChangedHandler.event; }

  protected disposingInstance(): void {
    super.disposingInstance();
    // resolve references to listeners
    this._valueChangedHandler.dispose();
  }
}

// simulates a function that is somewhere in the code and manipulates the instance/caller
function changeValue(incoming_: Example<number>) {
  incoming_.value = 42 + incoming_.value;
}

// create instance/caller
const example = new Example(42);
// unique subscription id
const identifier = 'id for my subscription';

example.valueChanged.subscribe(
  identifier,
  (sender_, args_) => {
    // --> sender/invoker: instance of example class
    console.log(sender_);
    // --> submitted value --> 84
    console.log(args_.value);
    // will unsubscribe from the event (just an example use case)
    sender_.valueChanged.unsubscribe(identifier);
  }
);

// execute code that modifies the subscribed instance
changeValue(example);
```

### Cancelable Events

Actions can be canceled via events.

```ts
import { Event, CancelEventArgs, Disposable, EventHandler } from 'ts-lib-extended':

export class Example extends Disposable {
  private _loggingHandler: EventHandler<this, CancelEventArgs<string>>;

  constructor() {
    super();
    this._loggingHandler = new EventHandler();
  }

  public log(message_: string): void {
    const cancelationArgs = new CancelEventArgs<string>(message_);
    this._loggingHandler.invoke(this, cancelationArgs);

    // will not set value if canceled by event
    if (cancelationArgs.cancel) {
      return;
    }

    console.log(message_);
  }

  public get logging(): Event<this, CancelEventArgs<string>> { return this._loggingHandler.event; }

  protected disposingInstance(): void {
    super.disposingInstance();
    this._loggingHandler.dispose();
  }
}

function changeValue(incoming_: Example) {
  incoming_.log('my log message');
}

const example = new Example();
example.logging.subscribe('39fgfhuf85j', (_sender_, args_) => {
  // cancel if message is specific value
  args_.cancel = args_.value === 'my log message';
});

changeValue(example);
```

### Disposable

A disposable instance can be cleaned so that references to other instances can be released. After disposing the instance is partly "dead", some parts are vanished and not longer usable.

```ts
import { Disposable } from 'ts-lib-extended';

class Example extends Disposable {
  constructor(
    private _parentReference: any[]
  ) {
    super();
    this._disposers.push(() => this.releaseReferences());
  }

  private releaseReferences() {
    this._parentReference.splice(0);
  }
}

const instances = [{}];
const example = new Example(instances);
console.log(example.isDisposed) // false
example.dispose();
console.log(example.isDisposed) // true
```

This example uses the `disposers` feature for disposing internal stuff. You can also use `overrides` (disposingInstance, disposedInstance) to get this job done.
