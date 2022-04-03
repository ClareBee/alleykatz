import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import PostsContainer from '../components/Posts/PostsContainer';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return <PostsContainer />;
};

export default Home;
