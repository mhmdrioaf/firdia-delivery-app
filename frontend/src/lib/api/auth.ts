"use server";

import { ApiEndpoint, Token } from "@/lib/constants";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import {
  AuthRedirectType,
  AuthStatus,
  AuthType,
  TAuthResponse,
  TSessionResponse,
} from "./auth-type";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BASE_URL) throw new Error("API Base URL is not set.");

export async function getSession() {
  const accessToken = cookies().get(Token.Access)?.value ?? null;
  const refreshToken = cookies().get(Token.Refresh)?.value ?? null;

  if (!accessToken || !refreshToken) return null;

  const session = jwtDecode(accessToken);
  const expirationTime = session.exp;
  const now = Date.now() / 1000;

  if (expirationTime) {
    if (expirationTime < now) {
      const res = await fetch(ApiEndpoint.Auth.Refresh, {
        method: "POST",
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });

      const response = await res.json();

      if (res.status === 200) {
        cookies().set(Token.Access, response.access);
        return {
          access: response.access as string,
          refresh: response.refresh as string,
        };
      }
    } else {
      return {
        access: accessToken,
        refresh: refreshToken,
      };
    }
  }

  return null;
}

export async function authHandler(
  type: AuthType,
  _prevState: TAuthResponse,
  formData: FormData
): Promise<TAuthResponse> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    const url =
      type === AuthType.Register
        ? ApiEndpoint.Auth.Register
        : ApiEndpoint.Auth.Authenticate;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const response: TSessionResponse = await res.json();
    if (res.status === 200) {
      cookies().set(Token.Access, response.access);
      cookies().set(Token.Refresh, response.refresh);

      return {
        message: "Berhasil masuk.",
        redirect: AuthRedirectType.Dashboard,
        status: AuthStatus.Success,
      };
    } else if (type === AuthType.Register && res.status === 201) {
      return {
        message:
          "Berhasil daftar, silakan masuk menggunakan akun yang anda daftarkan.",
        status: AuthStatus.Success,
        redirect: AuthRedirectType.Login,
      };
    } else if (res.status === 401) {
      return {
        message: "Username/password yang anda masukkan salah.",
        redirect: AuthRedirectType.Login,
        status: AuthStatus.Failed,
      };
    } else {
      return {
        message: "Terjadi kesalahan pada sistem, silakan coba lagi nanti.",
        redirect: AuthRedirectType.Login,
        status: AuthStatus.Failed,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Terjadi kesalahan pada sistem, silakan coba lagi nanti.",
      redirect: AuthRedirectType.Login,
      status: AuthStatus.Failed,
    };
  }
}

export async function logout() {
  cookies().delete(Token.Access);
  cookies().delete(Token.Refresh);

  redirect("/", RedirectType.replace);
}
