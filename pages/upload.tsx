import type { NextPage } from 'next';
import { useState, MouseEvent } from 'react';
import Posts from '../components/Posts';
import ImageUploaderModal from '../components/ImageUploaderModal';
import { Flex, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { route } from 'next/dist/server/router';

const UPLOAD_URL = 'https://api.thecatapi.com/v1/images/upload';

const Update: NextPage = () => {
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  // move to redux
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (!target?.files) {
      return;
    }
    setSelectedImg(target.files[0]);
  };

  const uploadImage = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedImg) {
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', selectedImg);

    // TODO: move to service
    try {
      const requestHeaders: HeadersInit = new Headers();
      const key = process.env.NEXT_PUBLIC_API_KEY;

      if (!key) {
        throw new Error('Missing credentials');
      }
      requestHeaders.set('x-api-key', key);

      await fetch(UPLOAD_URL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: requestHeaders,
        body: formData,
      }).then((res) => {
        console.log(res);
        setIsLoading(false);
        router.push('/');
      });
    } catch (error) {
      console.log(error);
      setError(true);
      setIsLoading(false);
    }
  };
  return (
    <>
      <input type="file" onChange={handleOnChange} />
      {error && <p>Something went wrong</p>}

      <Button
        disabled={!selectedImg}
        onClick={uploadImage}
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        Upload Image
      </Button>
    </>
  );
};

export default Update;
