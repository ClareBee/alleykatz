import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import styles from '../styles/Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <Box as="footer" height="50" marginTop="-50">
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </Box>
  );
};

export default Footer;
