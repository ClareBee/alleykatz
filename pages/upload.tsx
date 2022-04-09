import type { NextPage } from 'next';
import { Stack } from '@chakra-ui/react';

import ImageUploader from '../components/ImageUploader';

const Update: NextPage = () => {
  return (
    <Stack width="80%" margin="0 auto" color="brand.700">
      <ImageUploader />
    </Stack>
  );
};

export default Update;
