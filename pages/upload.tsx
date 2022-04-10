import type { NextPage } from 'next';
import { Stack } from '@chakra-ui/react';

import ImageUploader from '../components/ImageUploader';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Update: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if(!session) {
  //     router.push('/')
  //   }
  // }, [session, router])

  return (<Stack width="80%" margin="0 auto" color="brand.700">
    <ImageUploader />
  </Stack>
  )
};

export default Update;
