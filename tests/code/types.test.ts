import { describe, expect, test } from 'vitest';

describe('import test', () => {
  test('types', () => {
    // test whether imports work
    expect.assertions(1);
    expect(Promise.all([
      import('@/array.js'),
      import('@/constructor.js'),
      import('@/dictionary.js'),
      import('@/emptyObject.js'),
      import('@/event/types.js'),
      import('@/shape.js'),
      import('@/mapping.js')
    ])).resolves.not.toThrow();
  });
});
