import { Box, IconButton } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { VoteProps } from '../../ts/interfaces';

const VOTES_URL = 'https://api.thecatapi.com/v1/votes';

const VoteButtons: React.FC<VoteProps> = ({ imageId }) => {
  const handleVote = async (e: MouseEvent<HTMLButtonElement>, value: number) => {
    e.preventDefault();
    try {
      const requestHeaders: HeadersInit = new Headers();
      const key = process.env.NEXT_PUBLIC_API_KEY;

      if (!key) {
        throw new Error('Missing credentials');
      }
      requestHeaders.set('Content-Type', 'application/json');
      requestHeaders.set('x-api-key', key);
      const data = {
        image_id: imageId,
        sub_id: '123',
        value
      };

      const res = await fetch(VOTES_URL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: requestHeaders,
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box>
      <IconButton aria-label="Vote up" icon={<BiUpvote />} marginRight="10px" onClick={(e) => handleVote(e, 1)}/>
      <IconButton aria-label="Vote down" icon={<BiDownvote />} onClick={(e) => handleVote(e, 0)} />
    </Box>
  );
};

export default VoteButtons;
