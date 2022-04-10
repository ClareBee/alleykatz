import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";

import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    process.env.VERCEL_ENV !== 'production'
      ? CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: {
              label: 'Username',
              type: 'text',
              placeholder: 'ClareBee',
            },
            password: { label: 'Password', type: process.env.SECRET_PASSWORD },
          },
          async authorize() {
            return {
              id: 1,
              name: 'Clare Bee',
              email: 'cbee@example.com',
              image: 'https://avatars.githubusercontent.com/u/10653492?v=4',
            };
          },
        })
      : GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
  ],
});
