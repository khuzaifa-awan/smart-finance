// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../utils/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { compare } from "bcryptjs";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const users = client.db().collection("users");
        const user = await users.findOne({
          email: credentials.email,
          authType: "credentials",
        });

        // console.log("User found:", user);

        if (!user) {
          throw new Error("No user found with this email and authType");
        }

        const passwordMatch = await compare(
          credentials.password,
          user.password
        );
        console.log("Password match:", passwordMatch);

        if (!passwordMatch) {
          throw new Error("Invalid password");
        }
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt", // force use of JWT instead of DB-stored sessions
  },
  callbacks: {
    async redirect({ url }) {
      return url; // Redirect to /home instead of base "/"
    },

    async signIn({ user, account }) {
      const client = await clientPromise;
      const db = client.db();
      const usersCollection = db.collection("users");
      const accountsCollection = db.collection("accounts");

      const existingUser = await usersCollection.findOne({ email: user.email });

      if (account.provider === "google") {
        if (!existingUser) {
          const inserted = await usersCollection.insertOne({
            email: user.email,
            username: user.name || user.email.split("@")[0],
            authType: "google",
            createdAt: new Date(),
          });

          await accountsCollection.insertOne({
            userId: inserted.insertedId,
            provider: "google",
            type: "oauth",
            providerAccountId: account.providerAccountId,
            access_token: account.access_token,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
          });
        } else {
          // Make sure account is linked
          const linkedAccount = await accountsCollection.findOne({
            provider: "google",
            providerAccountId: account.providerAccountId,
          });

          if (!linkedAccount) {
            await accountsCollection.insertOne({
              userId: existingUser._id,
              provider: "google",
              type: "oauth",
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
            });
          }
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || user._id?.toString();
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id || token.sub || null;
      return session;
    },
  },

  pages: {
    signIn: "/", // if you have a custom login page
  },
};

export default NextAuth(authOptions);
