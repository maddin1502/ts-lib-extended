import {
  Disposable,
  DisposableBase,
  Event,
  EventArgs,
  CancelEventArgs
} from '../../src';

describe('root', () => {
  test('exports', () => {
    expect(Disposable).toBeDefined();
    expect(DisposableBase).toBeDefined();
    expect(Event).toBeDefined();
    expect(EventArgs).toBeDefined();
    expect(CancelEventArgs).toBeDefined();
  });
});
