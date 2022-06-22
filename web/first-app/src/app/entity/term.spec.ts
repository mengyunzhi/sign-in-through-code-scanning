import { Term } from './term';

describe('Term', () => {
  it('should create an instance', () => {
    expect(new Term({id: 1, state: 1, name: '123'})).toBeTruthy();
  });
});
