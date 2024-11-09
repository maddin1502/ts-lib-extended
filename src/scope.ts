import { Disposable } from './disposable/index.js';

/**
 * scoped instance that can be split into different variants
 *
 * @export
 * @template T
 * @template {string} Variant instance variants (e.g. 'dark' | 'light')
 * @since 4.0.0
 */
export type InstanceScope<T, Variant extends string> = {
  readonly [key in Variant]: T;
} & {
  variants: T[];
};

/**
 * scopes cache
 *
 * @export
 * @template T
 * @template {string} Variant instance variants (e.g. 'dark' | 'light')
 * @since 4.0.0
 */
export type ScopesSource<T, Variant extends string> = Map<
  PropertyKey,
  InstanceScope<T, Variant>
>;

/**
 * instance scope support
 *
 * @export
 * @template T
 * @template {string} Variant instance variants (e.g. 'dark' | 'light')
 * @since 4.0.0
 */
export type ScopedInstance<T, Variant extends string> = {
  scope(id_: PropertyKey): InstanceScope<T, Variant>;
  scopes: InstanceScope<T, Variant>[];
};

/**
 * extend from this core class to get quick scope support
 *
 * @export
 * @abstract
 * @class ScopedInstanceCore
 * @template T
 * @template {string} Variant instance variants (e.g. 'dark' | 'light')
 * @extends {Disposable}
 * @implements {ScopedInstance<T, Variant>}
 * @since 4.0.0
 */
export abstract class ScopedInstanceCore<T, Variant extends string>
  extends Disposable
  implements ScopedInstance<T, Variant>
{
  private readonly _source: ScopesSource<T, Variant>;

  constructor() {
    super();
    this._source = new Map();

    this._disposers.push(() => {
      this._source.forEach((scope_) => this.disposeScope(scope_));
      this._source.clear();
    });
  }

  protected abstract disposeScope(scope_: InstanceScope<T, Variant>): void;

  protected abstract createScope(id_: PropertyKey): InstanceScope<T, Variant>;

  public scope(id_: PropertyKey): InstanceScope<T, Variant> {
    this.validateDisposed(this);
    let scope = this._source.get(id_);

    if (!scope) {
      scope = this.createScope(id_);
      this._source.set(id_, scope);
    }

    return scope;
  }

  public get scopes(): InstanceScope<T, Variant>[] {
    this.validateDisposed(this);
    return [...this._source.values()];
  }
}
