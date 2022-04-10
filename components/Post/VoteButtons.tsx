import { Box, IconButton } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { VoteProps } from '../../ts/interfaces';
import { setError } from '../../redux/errorSlice';
import { useSession } from 'next-auth/react';

const VoteButtons: React.FC<VoteProps> = ({
  imageId,
  mutateVotes,
  userVote,
}) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const handleVote = async (
    e: MouseEvent<HTMLButtonElement>,
    value: number
  ) => {
    e.preventDefault();
    if (userVote?.id && userVote?.vote === value) {
      const response = await fetch(`/api/vote/${userVote.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        dispatch(setError('Something went wrong with your vote'));
      } else {
        mutateVotes();
      }
    } else {
      const form = {
        value: value,
        userId: session?.user?.name,
      };
      const response = await fetch(`/api/vote/${imageId}`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        dispatch(setError('Something went wrong with your vote'));
      } else {
        mutateVotes();
      }
    }
  };
  return (
    <>
      <Box>
        <IconButton
          bgColor={userVote?.vote === 1 ? 'green.100' : 'white'}
          aria-label="Vote up"
          icon={<BiUpvote />}
          marginRight="10px"
          onClick={(e) => handleVote(e, 1)}
        />
        <IconButton
          bgColor={userVote?.vote === 0 ? 'red.100' : 'white'}
          aria-label="Vote down"
          icon={<BiDownvote />}
          onClick={(e) => handleVote(e, 0)}
        />
      </Box>
    </>
  );
};

export default VoteButtons;
