import { EnumerableObject } from '../../src/enumerable';

enum MixedEnum {
  a = 'foo',
  b = 1
}

enum NumberEnum {
  a,
  b
}

enum StringEnum {
  a = 'foo',
  b = 'bar'
}

describe(EnumerableObject, () => {
  test('entries', () => {
    expect.assertions(3);
    const enumObj = new EnumerableObject();

    expect(enumObj.entries(MixedEnum)).toEqual([['a', 'foo'], ['b', 1]]);
    expect(enumObj.entries(NumberEnum)).toEqual([['a', 0], ['b', 1]]);
    expect(enumObj.entries(StringEnum)).toEqual([['a', 'foo'], ['b', 'bar']]);
  });

  test('values', () => {
    expect.assertions(3);
    const enumObj = new EnumerableObject();

    expect(enumObj.values(MixedEnum)).toEqual(['foo', 1]);
    expect(enumObj.values(NumberEnum)).toEqual([0, 1]);
    expect(enumObj.values(StringEnum)).toEqual(['foo', 'bar']);
  });

  test('keys', () => {
    expect.assertions(3);
    const enumObj = new EnumerableObject();

    expect(enumObj.keys(MixedEnum)).toEqual(['a', 'b']);
    expect(enumObj.keys(NumberEnum)).toEqual(['a', 'b']);
    expect(enumObj.keys(StringEnum)).toEqual(['a', 'b']);
  });
});
