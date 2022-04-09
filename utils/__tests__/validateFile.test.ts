import { isFileSizeValid } from './../validateFile';

describe('isFileSizeValid', () => {
  it('rejects files that are too big', () => {
    expect(isFileSizeValid(700000000)).toBe(false);
  });
  it('accepts files that are not too big', () => {
    expect(isFileSizeValid(290000)).toBe(true);
  });
});
