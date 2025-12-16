import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import argon2 from "argon2";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          await connectDB();
          
          const user = await User.findOne({ username: credentials.username });
          
          if (!user) {
            throw new Error("Utilisateur non trouvé");
          }

          // Vérifier le mot de passe avec Argon2
          const isValid = await argon2.verify(user.password, credentials.password);
          
          if (!isValid) {
            throw new Error("Mot de passe incorrect");
          }

          return {
            id: user._id.toString(),
            lastname: user.lastname,
            firstname: user.firstname,
            username: user.username,
            email: user.email,
            role: user.role
          };
        } catch (error) {
          console.error("Erreur d'authentification:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt", // Utilise JWT pour les sessions
    maxAge: 24 * 60 * 60, // 24 heures
  },
  pages: {
    signIn: '/dashboard/login', // Page de connexion personnalisée
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.username = user.username;
        session.user.role = token.role;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };