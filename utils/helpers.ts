import { Vote } from '../ts/types/types';

export const calculateVote = (votes: Vote[]): number => {
  const upVotes = votes.filter((vote) => vote.value === 1);
  return upVotes.length - (votes.length - upVotes.length);
};

export const getUserVote = (votes: Vote[], userId: string = '123') => {
  if (!votes || votes.length === 0) return;
  const vote = votes.find((vote: Vote) => vote.sub_id === userId);
  return vote?.value;
};