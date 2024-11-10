import { Disposable } from './disposable/index.js';

/**
 * @export
 * @template T
 * @since 4.0.0
 */
export type InstanceScopeVariants<T> = {
  variants: T[];
};

/**
 * instance scope that can be split into different variants
 *
 * @export
 * @template T
 * @template {string} Variant instance variants (e.g. 'dark' | 'light')
 * @since 4.0.0
 */
export type InstanceScope<T = any, Variant extends string = string> = {
  readonly [key in Variant]: T;
} & InstanceScopeVariants<T>;

/**
 * scopes cache
 *
 * @export
 * @template {InstanceScope} S
 * @since 4.0.0
 */
export type ScopesSource<S extends InstanceScope> = Map<PropertyKey, S>;

/**
 * @export
 * @template {InstanceScope} S
 * @since 4.0.0
 */
export type ScopedInstance<S extends InstanceScope> = {
  scope(id_: PropertyKey): S;
  scopes: S[];
};

/**
 * extend from this core class to get quick scope support
 *
 * @export
 * @abstract
 * @class ScopedInstanceCore
 * @template {InstanceScope} S
 * @extends {Disposable}
 * @implements {ScopedInstance<S>}
 * @since 4.0.0
 */
export abstract class ScopedInstanceCore<S extends InstanceScope>
  extends Disposable
  implements ScopedInstance<S>
{
  private readonly _source: ScopesSource<S>;

  constructor() {
    super();
    this._source = new Map();

    this._disposers.push(() => {
      this._source.forEach((scope_) => this.disposeScope(scope_));
      this._source.clear();
    });
  }

  protected abstract disposeScope(scope_: S): void;

  protected abstract createScope(id_: PropertyKey): S;

  public scope(id_: PropertyKey): S {
    this.validateDisposed(this);
    let scope = this._source.get(id_);

    if (!scope) {
      scope = this.createScope(id_);
      this._source.set(id_, scope);
    }

    return scope;
  }

  public get scopes(): S[] {
    this.validateDisposed(this);
    return [...this._source.values()];
  }
}

/**
 * scope variants cache
 *
 * @export
 * @template T
 * @template {string} Variant instance variants (e.g. 'dark' | 'light')
 * @since 4.0.0
 */
export type ScopeVariantsSource<T, Variant extends string> = Map<Variant, T>;

/**
 * use this as scope base to access core features
 *
 * @export
 * @abstract
 * @class InstanceScopeCore
 * @template T
 * @template {string} Variant instance variants (e.g. 'dark' | 'light')
 * @extends {Disposable}
 * @implements {InstanceScopeVariants<T>}
 * @since 4.0.0
 */
export abstract class InstanceScopeCore<T, Variant extends string>
  extends Disposable
  implements InstanceScopeVariants<T>
{
  private _source: ScopeVariantsSource<T, Variant>;

  constructor(public readonly scopeId: PropertyKey) {
    super();
    this._source = new Map();

    this._disposers.push(() => {
      this._source.forEach((variante_) => this.disposeInstance(variante_));
      this._source.clear();
    });
  }

  public get variants(): T[] {
    return [...this._source.values()];
  }

  protected getOrCreateInstance(variant_: Variant): T {
    let instance = this._source.get(variant_);

    if (!instance) {
      instance = this.createInstance(variant_);
      this._source.set(variant_, instance);
    }

    return instance;
  }

  protected abstract createInstance(variant_: Variant): T;
  protected abstract disposeInstance(instance_: T): void;
}
