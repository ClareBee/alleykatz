import Image from 'next/image';
import { useState, useRef, MouseEvent } from 'react';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { setBaseHeaders } from '../../utils/headers';
import { isFileSizeValid } from '../../utils/validateFile';
import { FaCamera, FaCat } from 'react-icons/fa';
import { ImageUploaderProps } from '../../ts/interfaces';

const UPLOAD_URL = 'https://api.thecatapi.com/v1/images/upload';

const ImageUploader: React.FC<ImageUploaderProps> = ({ isModal, mutatePosts, onClose }) => {

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
        if(isModal) {
          onClose && onClose()
          mutatePosts && mutatePosts();
        } else {
          router.push('/');
        }
        setIsLoading(false);
      });
    } catch (error) {
      setError('There was a problem uploading your file. Please try again.');
      setIsLoading(false);
      setSelectedImg(null);
    }
  };
  return (
    <Stack width="80%" margin="0 auto" color="brand.700">
      <Button
        onClick={() =>
          imageUploaderRef.current && imageUploaderRef.current.click()
        }
        isLoading={isLoading}
        isDisabled={isLoading}
        display="flex"
        flexWrap="wrap"
        height="auto"
        p="10px 20px"
      >
        <Text
          marginRight="20px"
          lineHeight="6"
          style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
        >
          Upload a photo of your cat
        </Text>
        <FaCamera />
      </Button>
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
        display="flex"
        flexWrap="wrap"
        height="auto"
        p="10px 20px"
      >
        <Text
          marginRight="20px"
          lineHeight="6"
          style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
        >
          Confirm
        </Text>
        <FaCat />
      </Button>
    </Stack>
  );
}

export default ImageUploader