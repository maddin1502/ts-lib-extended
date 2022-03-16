import {
  Disposable,
  DisposableBase,
  Event,
  EventArgs,
  CancelEventArgs,
  EnumerableObject,
  enumerableObject
} from '../../src';

describe('root', () => {
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
