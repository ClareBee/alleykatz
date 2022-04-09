import { Box, IconButton } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { mutate } from 'swr';
import { vote, VOTES_URL } from '../../services/vote';
import { VoteProps } from '../../ts/interfaces';

const VoteButtons: React.FC<VoteProps> = ({ imageId }) => {
  const handleVote = async (e: MouseEvent<HTMLButtonElement>, value: number) => {
    e.preventDefault();
    const { voteError } = vote(imageId, value);
    // TODO: refactor to bound mutate?
    mutate(VOTES_URL)
  }

  return (
    <Box>
      <IconButton aria-label="Vote up" icon={<BiUpvote />} marginRight="10px" onClick={(e) => handleVote(e, 1)}/>
      <IconButton aria-label="Vote down" icon={<BiDownvote />} onClick={(e) => handleVote(e, 0)} />
    </Box>
  );
};

export default VoteButtons;
