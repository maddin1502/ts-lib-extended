import { ScopedInstanceCore, type InstanceScope } from '@/scope.js';
import { describe, expect, test } from 'vitest';

type TestVariant = 'a' | 'b';

class TestScope implements InstanceScope<Test, TestVariant> {
  private a_: Test | undefined;
  private b_: Test | undefined;

  constructor(
    public readonly id: PropertyKey,
    private createInstance_: (variant_: TestVariant) => Test
  ) {}

  public get a(): Test {
    return (this.a_ ??= this.createInstance_('a'));
  }

  public get b(): Test {
    return (this.b_ ??= this.createInstance_('b'));
  }

  public get variants(): Test[] {
    const v: Test[] = [];

    if (this.a_) {
      v.push(this.a_);
    }

    if (this.b_) {
      v.push(this.b_);
    }

    return v;
  }
}

class Test extends ScopedInstanceCore<Test, TestVariant> {
  constructor(
    public readonly id: PropertyKey,
    public readonly variant: TestVariant | 'root'
  ) {
    super();
  }

  protected disposeScope(scope_: TestScope): void {
    scope_.variants.forEach((v_) => v_.dispose());
  }
  protected createScope(id_: PropertyKey): TestScope {
    return new TestScope(id_, (variant_) => new Test(id_, variant_));
  }
}

describe(ScopedInstanceCore, () => {
  test('scoping', () => {
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
