import type { NextPage } from 'next';
import Image from 'next/image';
import { useState, useRef, MouseEvent } from 'react';
import { Box, Button, IconButton, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { setBaseHeaders } from '../utils/headers';
import { isFileSizeValid } from '../utils/validateFile';
import { FaCamera } from 'react-icons/fa';

const UPLOAD_URL = 'https://api.thecatapi.com/v1/images/upload';

const Update: NextPage = () => {
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>(
    null
  );
  const imageUploaderRef = useRef<HTMLInputElement>(null);
  // move to redux?
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent) => {
    resetError();

    const target = e.target as HTMLInputElement;
    if (!target?.files) {
      return;
    }
    if (target.files.length > 1) {
      setError('You can only upload one image at a time');
    }
    const file = target.files[0];
    console.log(file);
    if (file && !isFileSizeValid(file.size)) {
      setError('File size is too big');
    }
    setSelectedImg(file);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (readEvent) => {
      if (!readEvent || !readEvent.target) {
        return setError('Something went wrong');
      }
      setPreviewImg(readEvent.target.result);
    };
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
        router.push('/');
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setError('There was a problem uploading your file. Please try again.');
      setIsLoading(false);
      setSelectedImg(null);
    }
  };
  console.log('selected', selectedImg);
  return (
    <Stack width="80%" margin="0 auto" color="brand.700">
      <IconButton
        icon={<FaCamera />}
        aria-label="upload a cat picture"
        onClick={() =>
          imageUploaderRef.current && imageUploaderRef.current.click()
        }
        marginBottom="4"
      />
      <input
        hidden
        ref={imageUploaderRef}
        type="file"
        onChange={handleOnChange}
        accept="image/png, image/jpeg"
        onClick={resetError}
      />
      {error && <p>Something went wrong: {error}</p>}
      {previewImg && (
        <Box
          width="100%"
          height="250px"
          position="relative"
          overflow="hidden"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            width="250px"
            height="250px"
            src={previewImg.toString()}
            alt="preview"
          />
        </Box>
      )}
      <Button
        disabled={!selectedImg || !!error}
        onClick={uploadImage}
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        Upload Image
      </Button>
    </Stack>
  );
};

export default Update;
