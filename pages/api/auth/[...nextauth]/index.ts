import NextAuth from "next-auth";
import { authConfig } from "../../../../lib/auth";

const handler = NextAuth(authConfig);

export default handler;