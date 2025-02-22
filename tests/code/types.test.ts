import { describe, expect, test } from 'vitest';

describe('import test', () => {
  test('types', async () => {
    // test whether imports work
    expect.assertions(1);
    await expect(Promise.all([
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
