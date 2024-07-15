import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import dbConnect from "../lib/mongoose";
import User from "../models/User";
import bcrypt from "bcrypt";

// import jwt from 'jsonwebtoken'
async function login(credentials) {
  try {
    await dbConnect();
    const user = await User.findOne({ username: credentials.username });
    if (!user) throw new Error("Wrong Credentials");
    const isCorrect = await bcrypt.compare(credentials.password, user.password);
    if (!isCorrect) throw new Error("Wrong Credentials");
    return user;
  } catch (error) {
    console.log("Error while logging in");
    throw new Error("Something went wrong.");
  }
}

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          console.log("This is user: ", user);
          return user;
          // console.log({credentials});
        } catch (error) {
          throw new Error("Failed to Login.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.id = user.id;
      }
      console.log("This is token: ", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.id = token.id;
      }
      console.log("This is the session: ", session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export default handler;
// export { handler as GET, handler as POST };
