import { JwtPayload } from "jwt-decode";

export type TSessionContext = {
  data: JwtPayload | null;
  status: SessionStatus;
};

export enum SessionStatus {
  Authenticated = "authenticated",
  Unauthenticated = "unauthenticated",
  Pending = "pending",
}

export type TSessionCookie = {
  [key: string]: string;
};

declare module "jwt-decode" {
  export interface JwtPayload {
    user_id: number;
  }
}
