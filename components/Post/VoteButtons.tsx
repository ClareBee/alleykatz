import { Box, IconButton } from '@chakra-ui/react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';

const VoteButtons: React.FC = () => {
  return (
    <Box>
      <IconButton aria-label="Vote up" icon={<BiUpvote />} marginRight="10px" />
      <IconButton aria-label="Vote down" icon={<BiDownvote />} />
    </Box>
  );
};

export default VoteButtons;
