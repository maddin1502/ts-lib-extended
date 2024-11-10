import {
  InstanceScopeCore,
  ScopedInstanceCore,
  type InstanceScope
} from '@/scope.js';
import { describe, expect, test } from 'vitest';

type TestVariant = 'a' | 'b';

class TestScope
  extends InstanceScopeCore<Test, TestVariant>
  implements InstanceScope<Test, TestVariant>
{
  public get a(): Test {
    return this.getOrCreateInstance('a');
  }

  public get b(): Test {
    return this.getOrCreateInstance('b');
  }

  protected createInstance(variant_: TestVariant): Test {
    return new Test(this.scopeId, variant_);
  }

  protected disposeInstance(instance_: Test): void {
    instance_.dispose();
  }
}

class Test extends ScopedInstanceCore<TestScope> {
  constructor(
    public readonly id: PropertyKey,
    public readonly variant: TestVariant | 'root'
  ) {
    super();
  }

  protected disposeScope(scope_: TestScope): void {
    scope_.dispose();
  }
  protected createScope(id_: PropertyKey): TestScope {
    return new TestScope(id_);
  }
}

describe(ScopedInstanceCore, () => {
  test('general', () => {
    expect.assertions(15);
    const test = new Test('root', 'root');
    expect(test.scopes.length).toBe(0);
    const scope1 = test.scope(1);
    expect(test.scopes.length).toBe(1);
    expect(scope1.variants.length).toBe(0);

    const scope1variantA = scope1.a;
    expect(scope1.variants.length).toBe(1);
    expect(scope1variantA.id).toBe(1);
    expect(scope1variantA.variant).toBe('a');

    const scope1variantB = scope1.b;
    expect(scope1.variants.length).toBe(2);
    expect(scope1variantB.id).toBe(1);
    expect(scope1variantB.variant).toBe('b');

    expect(test.isDisposed).toBe(false);
    expect(scope1variantA.isDisposed).toBe(false);
    expect(scope1variantB.isDisposed).toBe(false);
    test.dispose();
    expect(test.isDisposed).toBe(true);
    expect(scope1variantA.isDisposed).toBe(true);
    expect(scope1variantB.isDisposed).toBe(true);
  });
});

describe(InstanceScopeCore, () => {
  test('general', () => {
    expect.assertions(13);
    const scope = new TestScope('root');

    expect(scope.variants.length).toBe(0);
    const variantA = scope.a;
    expect(variantA.id).toBe('root');
    expect(variantA.variant).toBe('a');
    expect(scope.variants.length).toBe(1);
    const variantB = scope.b;
    expect(variantB.id).toBe('root');
    expect(variantB.variant).toBe('b');
    expect(scope.variants.length).toBe(2);

    expect(scope.isDisposed).toBe(false);
    expect(variantA.isDisposed).toBe(false);
    expect(variantB.isDisposed).toBe(false);
    scope.dispose();
    expect(scope.isDisposed).toBe(true);
    expect(variantA.isDisposed).toBe(true);
    expect(variantB.isDisposed).toBe(true);
  });
});
