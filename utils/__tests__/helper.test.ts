import { calculateVote, getUserVote } from '../helpers';
import { mixedVotes, testPostVotes } from './testData';


describe('calculateVote', () => {
  it('returns overall vote for a post from array of vote objects', () => {
    expect(calculateVote(testPostVotes)).toEqual(-1);
  });
});

describe('getUserVote', () => {
  it('returns user vote for a post', () => {
    expect(getUserVote(mixedVotes, '123')).toEqual({ vote: 0, id:  519222});
  });
});
