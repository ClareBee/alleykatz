import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { ImageModalProps } from '../../ts/interfaces';
import { FaCat } from 'react-icons/fa';

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  children,
}) => (
  <>
    <IconButton
      isDisabled={false}
      isRound={true}
      // isLoading={isLoading} // when moved into redux
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
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  </>
);

export default ImageModal;
