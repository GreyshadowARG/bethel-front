import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import clientPromise from "../../../../lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const usersCollection = client
          .db(process.env.DB_NAME)
          .collection("users");
        const username = credentials?.username;
        const user = await usersCollection.findOne({ username });
        if (!user) {
          throw new Error("User does not exist.");
        }

        //validate password
        const passwordIsValid = await bcrypt.compare(
          credentials?.password!,
          user.password
        );

        if (!passwordIsValid) {
          throw new Error("Invalid credentials");
        }
        return {
          id: user._id.toString(),
          ...user,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          refreshToken: token.refreshToken,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.username,
          refreshToken: u.refreshToken,
        };
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
