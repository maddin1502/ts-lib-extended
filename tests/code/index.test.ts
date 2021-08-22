import {
  Disposable,
  DisposableBase,
  Event,
  EventArgs,
  EventCancelArgs
} from '../../src';

describe('root', () => {
  test('exports', () => {
    expect(Disposable).toBeDefined();
    expect(DisposableBase).toBeDefined();
    expect(Event).toBeDefined();
    expect(EventArgs).toBeDefined();
    expect(EventCancelArgs).toBeDefined();
  });
});
