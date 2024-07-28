export type TSessionResponse = {
  access: string;
  refresh: string;
};

export type TAuthResponse = {
  status: AuthStatus;
  message: string;
  redirect: AuthRedirectType | null;
};

export enum AuthType {
  Login = "login",
  Register = "register",
}

export enum AuthStatus {
  Success = "success",
  Failed = "failed",
  Idle = "idle",
}

export enum AuthRedirectType {
  Dashboard = "dashboard",
  Login = "login",
}
