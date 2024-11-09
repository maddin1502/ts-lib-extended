# ts-lib-extended
> Additional types and tools for typescript

[![npm version](https://badge.fury.io/js/ts-lib-extended.svg)](https://badge.fury.io/js/ts-lib-extended)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://badgen.net/npm/dw/ts-lib-extended)](https://badge.fury.io/js/ts-lib-extended)

## Features
- Enum type (key and value extraction - ignores reveres mapping)
- Dictionary types (safe, readonly, key + value types)
- Constructor types (abstract, standard, parameter + instance types)
- Core class for disposable instances
- Events (handler, args, cancellation, external subscription + internal invocation)
- Array types (minimal length array, item type)
- Enforce Empty Object type (only allows the assignment of empty objects)

## Installation
```bash
npm i ts-lib-extended
```
## Events

With events it is possible to subscribe to a specific action or change on an instance.
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

# Safe dictionary

```ts
import { Dictionary } from 'ts-lib-extended';

const dictionary: Dictionary<number> = {
  spaceballs: 42
};

const answer = dictionary.spaceballs;

if (answer) {
  console.log(answer);
}
```

# Minimal length array

The type `MinArray` can restrict array values to a minimum length

```ts
import { MinArray } from 'ts-lib-extended';

function calcSum(...array_: MinArray<number, 2>): number {
  let sum = 0;

  for (let i = 0; i < array_.length; i++) {
    sum += array_[i];
  }

  return sum;
}

console.log(calcSum(1)); // TS Error - at least 2 arguments are expected
console.log(calcSum(1,2,3,5,8,13)); // 32
```

# Enumerable

By default there is no basic (accessible) enum type that can be used to specify variable/param types. `Enumerable` solves the problem.

```ts
enum MyEnum {
  tony = 'iron man',
  steve = 'cap',
  peter = 'spider-man',
  bruce = 'hulk'
}

enum NumberEnum {
  tony,
  steve,
  peter,
  bruce
}

function doSomethingWithEnum(enum_: Enumerable): void {
  /** crazy code here */
}

doSomethingWithEnum(NumberEnum);
doSomethingWithEnum(MyEnum);
```

## Gain keys and values

Gaining keys and/or values from an enum is tricky. Object.keys(), Object.values() and Object.entries() do not correctly consider the numeric index reverse lookup entries for numeric enums. The `enumarableObject` will solve this issue.

```ts
import { enumarableObject } from 'ts-lib-extended';

enum NumberEnum {
  e1,
  e2
}

console.log(Object.keys(NumberEnum)) // ["0", "1", "e1", "e2"]
console.log(enumarableObject.keys(NumberEnum)) // ["e1", "e2"]

console.log(Object.values(NumberEnum)) // ["e1", "e2", 0, 1]
console.log(enumarableObject.values(NumberEnum)) // [0, 1]

console.log(Object.entries(NumberEnum)) // [["0", "e1"], ["1", "e2"], ["e1", 0], ["e2", 1]]
console.log(enumarableObject.entries(NumberEnum)) // [["e1", 0], ["e2", 1]]
```

# "Empty Object" type

Sometimes you need a `this object is empty`-type (e.g. as a default assignment for generics). Unfortunately, this cannot be achieved with `{}` ([detailed explanation](https://mercury.com/blog/creating-an-emptyobject-type-in-typescript)).

```ts
import type { EmptyObject } from 'ts-lib-extended';

type CustomParameters = Record<string, any>;

abstract class Special<T extends CustomParameters = EmptyObject> {
    public abstract doSomething(params_?: T): void;
}

type ValueParameters = { value: string };

class SpecialWithParams<T extends ValueParameters> extends Special<T> {
    public doSomething(params_?: T): void {
        /* do something */
    }
}

class SpecialWithoutParams extends Special {
    public doSomething(params_?: EmptyObject): void {
        /* without the generic type "params_" is unusable (and can be omitted) */
    }
}
```

# Scoping

Extend your classes from ScopedInstanceCore to get quick access to scopes. Scopes allow you to create a tree structure within your class instance. Variants can be used to create custom instances per scope.

```ts
class MyClass extends ScopedInstanceCore<MyClass, 'dark' | 'light'> {
  constructor(public readonly user?: string) {
    super();
  }

  protected disposeScope(scope_: MyClassScope): void {
    scope_.variants.forEach((v_) => v_.dispose());
  }

  protected createScope(id_: PropertyKey): MyClassScope {
    return new MyClassScope(id_);
  }
}

class MyClassScope implements InstanceScope<MyClass, 'dark' | 'light'> {
  constructor(private _scopeId: PropertyKey) {}

  private dark_: MyClass | undefined;
  private light_: MyClass | undefined;

  public get dark(): MyClass {
    return (this.dark_ ??= new MyClass(
      this._scopeId === 'starwars' ? 'Anakin Skywalker' : 'Riku'
    ));
  }

  public get light(): MyClass {
    return (this.light_ ??= new MyClass(
      this._scopeId === 'starwars' ? 'Luke Skywalker' : 'Sora'
    ));
  }

  public get variants(): MyClass[] {
    const v: MyClass[] = [];

    if (this.dark_) {
      v.push(this.dark_);
    }

    if (this.light_) {
      v.push(this.light_);
    }

    return v;
  }
}

const mc = new MyClass();
const starwarsScope = mc.scope('starwars');
starwarsScope.dark.user; // => Anakin Skywalker
starwarsScope.light.user; // => Luke Skywalker

const kingdomheartsScope = mc.scope('kingdomhearts'); // or any other scope id
kingdomheartsScope.dark.user; // => Riku
kingdomheartsScope.light.user; // => Sora
```
