import { Box, IconButton, Text } from '@chakra-ui/react';
import { MouseEvent, useState } from 'react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { vote } from '../../services/vote';
import { VoteProps } from '../../ts/interfaces';
import { setError } from '../../redux/errorSlice';

const VoteButtons: React.FC<VoteProps> = ({
  imageId,
  mutateVotes,
  userVote,
}) => {
  const dispatch = useDispatch()
  
  const handleVote = async (
    e: MouseEvent<HTMLButtonElement>,
    value: number
  ) => {
    e.preventDefault();
    const { voteError } = await vote(imageId, value);
    if (voteError) {
      dispatch(setError('Something went wrong with your vote'));
    } else {
      mutateVotes();
    }
  };

  return (
    <>
      <Box>
        <IconButton
          bgColor={userVote === 1 ? 'green.100' : 'white'}
          disabled={userVote === 1}
          aria-label="Vote up"
          icon={<BiUpvote />}
          marginRight="10px"
          onClick={(e) => handleVote(e, 1)}
        />
        <IconButton
          bgColor={userVote === 0 ? 'red.100' : 'white'}
          disabled={userVote === 0}
          aria-label="Vote down"
          icon={<BiDownvote />}
          onClick={(e) => handleVote(e, 0)}
        />
      </Box>
    </>
  );
};

export default VoteButtons;
