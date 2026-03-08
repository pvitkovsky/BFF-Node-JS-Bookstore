import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    readonly id: number;
    readonly login: string;
  }

  interface Session {
    readonly user: User;
  }
}