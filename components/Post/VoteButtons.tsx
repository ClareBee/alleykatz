import { Box, IconButton, Text } from '@chakra-ui/react';
import { MouseEvent, useState } from 'react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { vote } from '../../services/vote';
import { VoteProps } from '../../ts/interfaces';

const VoteButtons: React.FC<VoteProps> = ({
  imageId,
  mutateVotes,
  userVote,
}) => {
  const [error, setError] = useState<string | null>(null);
  const handleVote = async (
    e: MouseEvent<HTMLButtonElement>,
    value: number
  ) => {
    e.preventDefault();
    const { voteError } = await vote(imageId, value);
    if (voteError) {
      setError('Something went wrong with your vote');
    } else {
      mutateVotes();
    }
  };
  return (
    <>
      {error && <Text>{error}</Text>}
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
