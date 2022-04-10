import Image from 'next/image';
import { useState, useRef, MouseEvent } from 'react';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { setBaseHeaders } from '../../utils/headers';
import { isFileSizeValid } from '../../utils/validateFile';
import { FaCamera, FaCat } from 'react-icons/fa';
import { ImageUploaderProps } from '../../ts/interfaces';
import ErrorMessage from '../ErrorMessage';
import { clearError, setError } from '../../redux/errorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useSession } from 'next-auth/react';

const UPLOAD_URL = 'https://api.thecatapi.com/v1/images/upload';

const ImageUploader: React.FC<ImageUploaderProps> = ({
  isModal,
  mutatePosts,
  onClose,
}) => {
  const { data: session } = useSession();

  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>(
    null
  );
  const imageUploaderRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.error.error);

  const handleOnChange = (e: React.ChangeEvent) => {
    dispatch(clearError());

    const target = e.target as HTMLInputElement;
    if (!target?.files) {
      return;
    }
    if (target.files.length > 1) {
      dispatch(setError('You can only upload one image at a time'));
    }
    const file = target.files[0];
    if (file && !isFileSizeValid(file.size)) {
      dispatch(setError('File size is too big'));
    }
    setSelectedImg(file);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (readEvent) => {
      if (!readEvent || !readEvent.target) {
        return dispatch(setError('There was a problem reading the file'));
      }
      setPreviewImg(readEvent.target.result);
    };
  };

  const uploadImage = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedImg) {
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', selectedImg)
    formData.append('sub_id', session?.user?.name || '')

    try {
      await fetch('/api/images', {
        method: 'POST',
        body: formData,
      }).then((res) => {
        if (!res.ok) {
          setIsLoading(false);
          return dispatch(
            setError(
              'There was a problem uploading your file. Please try again.'
            )
          );
        }
        if (isModal) {
          onClose && onClose();
          mutatePosts && mutatePosts();
        } else {
          router.push('/');
        }
        setIsLoading(false);
      });
    } catch (error) {
      dispatch(
        setError('There was a problem uploading your file. Please try again.')
      );
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
        isDisabled={isLoading || !!error}
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
        onClick={() => dispatch(clearError())}
      />
      {error && (
        <ErrorMessage
          errorMessage={`Something went wrong: ${error}`}
          dismissError={() => dispatch(clearError())}
        />
      )}
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
};

export default ImageUploader;
