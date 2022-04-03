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
} from '@chakra-ui/react';
import { BsFillPlusCircleFill } from 'react-icons/bs';

const UPLOAD_URL = 'https://api.thecatapi.com/v1/images/upload';

const ImageModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImg, setSelectedImg] = useState(null);
  // move to redux
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    setSelectedImg(e.target.files[0]);
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
        onClose();
      });
    } catch (error) {
      console.log(error);
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
        icon={<BsFillPlusCircleFill />}
        size="lg"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload your cat</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <input type="file" onChange={handleOnChange} />
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
