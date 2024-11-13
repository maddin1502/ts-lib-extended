import {
  CancelEventArgs,
  Disposable,
  DisposableBase,
  EnumerableObject,
  enumerableObject,
  Event,
  EventArgs,
  ScopedInstanceCore
} from '@/index.js';
import { describe, expect, test } from 'vitest';

describe('main', () => {
  test('exports', () => {
    expect.assertions(8);
    expect(Disposable).toBeDefined();
    expect(DisposableBase).toBeDefined();
    expect(Event).toBeDefined();
    expect(EventArgs).toBeDefined();
    expect(CancelEventArgs).toBeDefined();
    expect(EnumerableObject).toBeDefined();
    expect(ScopedInstanceCore).toBeDefined();
    expect(enumerableObject).toBeDefined();
  });
});
