import { DefaultSession } from "next-auth";

declare module "nextauth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
