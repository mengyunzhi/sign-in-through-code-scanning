import { TermStatePipe } from './term-state.pipe';

describe('TermStatePipe', () => {
  it('create an instance', () => {
    const pipe = new TermStatePipe();
    expect(pipe).toBeTruthy();
    expect(pipe.transform(undefined as unknown as boolean)).toEqual('-');
    expect(pipe.transform(null as unknown as boolean)).toEqual('-');
    expect(pipe.transform(true)).toEqual('已激活');
  });
});
