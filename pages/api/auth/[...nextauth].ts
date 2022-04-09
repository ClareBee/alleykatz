import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    process.env.VERCEL_ENV === "preview"
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
            image: "https://i.pravatar.cc/150?u=jdoe@example.com",
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