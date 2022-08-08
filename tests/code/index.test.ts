import { describe, expect, test } from 'vitest';
import {
  CancelEventArgs,
  Disposable,
  DisposableBase,
  EnumerableObject,
  enumerableObject,
  Event,
  EventArgs
} from '../../src';

describe('main', () => {
  test('exports', () => {
    expect(Disposable).toBeDefined();
    expect(DisposableBase).toBeDefined();
    expect(Event).toBeDefined();
    expect(EventArgs).toBeDefined();
    expect(CancelEventArgs).toBeDefined();
    expect(EnumerableObject).toBeDefined();
    expect(enumerableObject).toBeDefined();
  });
});
