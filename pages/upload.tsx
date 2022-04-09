import type { NextPage } from 'next';
import { useState, MouseEvent } from 'react';
import Posts from '../components/Posts';
import ImageUploaderModal from '../components/ImageUploaderModal';
import { Flex, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { route } from 'next/dist/server/router';
import { setBaseHeaders } from '../utils/headers';
import { isFileSizeValid } from '../utils/validateFile';

const UPLOAD_URL = 'https://api.thecatapi.com/v1/images/upload';

const Update: NextPage = () => {
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  // move to redux
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent) => {
    resetError();
    const target = e.target as HTMLInputElement;
    if (!target?.files) {
      return;
    }
    const file = target.files[0];
    if(file && !isFileSizeValid(file.size)){
      setError('File size is too big');
    }
    setSelectedImg(target.files[0]);
  };

  const resetError = () => setError(null);

  const uploadImage = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedImg) {
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', selectedImg);

    try {
      const requestHeaders = setBaseHeaders();

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
      setError('There was a problem uploading your file. Please try again.');
      setIsLoading(false);
    }
  };
  console.log('selected', selectedImg)
  return (
    <>
      <input type="file" onChange={handleOnChange} accept="image/png, image/jpeg" onClick={resetError}/>
      {error && <p>Something went wrong: {error}</p>}

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
