import { useState, MouseEvent } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { ImageModalProps } from '../../ts/interfaces';
import { FaCat } from 'react-icons/fa';

const UPLOAD_URL = 'https://api.thecatapi.com/v1/images/upload';

const ImageModal: React.FC<ImageModalProps> = ({ mutatePosts }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  // move to redux
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    // move to service
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
        setSelectedImg(null);
        mutatePosts();
        onClose();
      });
    } catch (error) {
      console.log(error);
      setSelectedImg(null);
      setError(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <IconButton
        isDisabled={false}
        isRound={true}
        isLoading={isLoading}
        color="red"
        aria-label="Upload image of cat"
        icon={<BsFillPlusCircleFill height="100px" />}
        size="lg"
        onClick={onOpen}
        position="fixed"
        right="20px"
        bottom="20px"
        width="100px"
        height="100px"
        zIndex={4}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" flexDirection="row" alignItems="center">
            <Text marginRight="20px">Upload your cat</Text>
            <FaCat />
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <input
              type="file"
              onChange={handleOnChange}
              accept="image/png, image/jpeg"
            />
            {error && <p>Something went wrong</p>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              disabled={!selectedImg}
              onClick={uploadImage}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Upload Image
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageModal;
