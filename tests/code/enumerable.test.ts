import { EnumerableObject } from '@/enumerable.js';
import { describe, expect, test } from 'vitest';

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

enum MoreThan10Items {
  a,
  b,
  c,
  d,
  e,
  f,
  g,
  h,
  i,
  j,
  k,
  l
}

describe(EnumerableObject.name, () => {
  test('entries', () => {
    expect.assertions(4);
    const enumObj = new EnumerableObject();

    expect(enumObj.entries(MixedEnum)).toEqual([
      ['a', 'foo'],
      ['b', 1]
    ]);
    expect(enumObj.entries(NumberEnum)).toEqual([
      ['a', 0],
      ['b', 1]
    ]);
    expect(enumObj.entries(StringEnum)).toEqual([
      ['a', 'foo'],
      ['b', 'bar']
    ]);
    expect(enumObj.entries(MoreThan10Items)).toEqual([
      ['a', 0],
      ['b', 1],
      ['c', 2],
      ['d', 3],
      ['e', 4],
      ['f', 5],
      ['g', 6],
      ['h', 7],
      ['i', 8],
      ['j', 9],
      ['k', 10],
      ['l', 11]
    ]);
  });

  test('values', () => {
    expect.assertions(4);
    const enumObj = new EnumerableObject();

    expect(enumObj.values(MixedEnum)).toEqual(['foo', 1]);
    expect(enumObj.values(NumberEnum)).toEqual([0, 1]);
    expect(enumObj.values(StringEnum)).toEqual(['foo', 'bar']);
    expect(enumObj.values(MoreThan10Items)).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
    ]);
  });

  test('keys', () => {
    expect.assertions(4);
    const enumObj = new EnumerableObject();

    expect(enumObj.keys(MixedEnum)).toEqual(['a', 'b']);
    expect(enumObj.keys(NumberEnum)).toEqual(['a', 'b']);
    expect(enumObj.keys(StringEnum)).toEqual(['a', 'b']);
    expect(enumObj.keys(MoreThan10Items)).toEqual([
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l'
    ]);
  });
});
