import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from '@chakra-ui/react';
import { ErrorMessageProps } from '../ts/interfaces';

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  errorMessage,
  dismissError,
}) => (
  <Alert status="error">
    <AlertIcon />
    <AlertTitle mr={2}>Oops</AlertTitle>
    <AlertDescription>{errorMessage}</AlertDescription>
    {dismissError && (
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={dismissError}
      />
    )}
  </Alert>
);

export default ErrorMessage;
