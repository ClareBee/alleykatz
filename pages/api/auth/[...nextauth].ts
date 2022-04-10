import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    process.env.VERCEL_ENV !== "production"
    ? CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: {
            label: "Username",
            type: "text",
            placeholder: "ClareBee",
          },
          password: { label: "Password", type: "12345" },
        },
        async authorize() {
          return {
            id: 1,
            name: "Clare Bee",
            email: "cbee@example.com",
            image: "https://avatars.githubusercontent.com/u/10653492?v=4",
          }
        },
      })
    :
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
})