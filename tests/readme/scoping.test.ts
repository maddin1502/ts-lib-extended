import {
  InstanceScopeCore,
  ScopedInstanceCore,
  type InstanceScope
} from '@/index.js';
import { describe, expect, test } from 'vitest';

type MyScopeVariants = 'dark' | 'light';

class MyClass extends ScopedInstanceCore<MyClass, MyScopeVariants> {
  constructor(public readonly user?: string) {
    super();
  }

  protected disposeScope(scope_: MyClassScope): void {
    scope_.dispose();
  }

  protected createScope(scopeId_: PropertyKey): MyClassScope {
    return new MyClassScope(scopeId_);
  }
}

class MyClassScope
  extends InstanceScopeCore<MyClass, MyScopeVariants>
  implements InstanceScope<MyClass, MyScopeVariants>
{
  public get dark(): MyClass {
    return this.getOrCreateInstance('dark');
  }

  public get light(): MyClass {
    return this.getOrCreateInstance('light');
  }

  protected createInstance(variant_: MyScopeVariants): MyClass {
    let user: string;

    console.log(this.scopeId, variant_);

    if (variant_ === 'dark') {
      if (this.scopeId === 'starwars') {
        user = 'Anakin Skywalker';
      } else {
        user = 'Riku';
      }
    } else {
      if (this.scopeId === 'starwars') {
        user = 'Luke Skywalker';
      } else {
        user = 'Sora';
      }
    }

    return new MyClass(user);
  }

  protected disposeInstance(instance_: MyClass): void {
    instance_.dispose();
  }
}

const mc = new MyClass();
const starwarsScope = mc.scope('starwars');
starwarsScope.dark.user; // => Anakin Skywalker
starwarsScope.light.user; // => Luke Skywalker

const kingdomheartsScope = mc.scope('kingdomhearts'); // or any other scope id
kingdomheartsScope.dark.user; // => Riku
kingdomheartsScope.light.user; // => Sora

describe(MyClass, () => {
  test('scoping', () => {
    expect.assertions(4);
    expect(starwarsScope.dark.user).toBe('Anakin Skywalker');
    expect(starwarsScope.light.user).toBe('Luke Skywalker');
    expect(kingdomheartsScope.dark.user).toBe('Riku');
    expect(kingdomheartsScope.light.user).toBe('Sora');
  });
});
