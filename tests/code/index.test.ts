import {
  CancelEventArgs,
  Disposable,
  DisposableBase,
  EnumerableObject,
  Event,
  EventArgs,
  enumerableObject
} from '@/index.js';
import { describe, expect, test } from 'vitest';

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
