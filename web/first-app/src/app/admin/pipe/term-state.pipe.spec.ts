import { TermStatePipe } from './term-state.pipe';

describe('TermStatePipe', () => {
  it('create an instance', () => {
    const pipe = new TermStatePipe();
    expect(pipe).toBeTruthy();
    expect(pipe.transform(undefined as unknown as number)).toEqual('-');
    expect(pipe.transform(null as unknown as number)).toEqual('-');
    expect(pipe.transform(1)).toEqual('已激活');
  });
});
