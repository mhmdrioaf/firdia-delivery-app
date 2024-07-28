"use client";

import { Token } from "@/lib/constants";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { SessionStatus, TSessionContext, TSessionCookie } from "./type";

export const SessionContext = React.createContext<TSessionContext | null>(null);

export function useSession() {
  if (typeof window === undefined) {
    throw new Error("useSession must be used within SessionProvider.");
  }

  return React.useContext(SessionContext) as TSessionContext;
}

interface ISessionProviderProps {
  children: React.ReactNode;
}

export default function SessionProvider({ children }: ISessionProviderProps) {
  const [sessionStatus, setSessionStatus] = React.useState<SessionStatus>(
    SessionStatus.Pending
  );
  const mutateCookies = React.useCallback(() => {
    if (typeof document === undefined || typeof document === "undefined") {
      return null;
    } else {
      const rawCookies = document.cookie?.split("; ");
      const cookies: TSessionCookie = {};
      for (let i in rawCookies) {
        const cur = rawCookies[i].split("=");
        if (!cookies[cur[0]]) {
          cookies[cur[0]] = cur[1];
        }
      }

      if (cookies[Token.Access] && cookies[Token.Refresh]) {
        const decoded = jwtDecode(cookies[Token.Access]);
        return decoded;
      } else {
        return null;
      }
    }
  }, []);

  const session = mutateCookies();

  React.useEffect(() => {
    if (session !== null) {
      setSessionStatus(SessionStatus.Authenticated);
    } else {
      setSessionStatus(SessionStatus.Unauthenticated);
    }
  }, [session]);

  const sessionValues: TSessionContext = {
    data: session,
    status: sessionStatus,
  };

  return (
    <SessionContext.Provider value={sessionValues}>
      {children}
    </SessionContext.Provider>
  );
}
