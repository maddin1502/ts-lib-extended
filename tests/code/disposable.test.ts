import { Disposable } from '@/disposable/index.js';
import { describe, expect, test } from 'vitest';

describe(Disposable, () => {
  test('dispose', () => {
    expect.assertions(7);
    const disposable = new Disposable();
    let disposing = false;
    let disposed = false;

    disposable.disposing.subscribe('xyz', () => {
      expect(disposable.isDisposed).toBe(false);
      expect(disposed).toBe(false);
      disposing = true;
    });

    disposable.disposed.subscribe('abc', () => {
      expect(disposable.isDisposed).toBe(true);
      expect(disposing).toBe(true);
      disposed = true;
    });

    expect(disposable.isDisposed).toBe(false);
    disposable.dispose();
    expect(disposable.isDisposed).toBe(true);
    disposable.dispose();
    expect(disposable.isDisposed).toBe(true);
  });
});
