export interface LoginI {
  password: String;
  email: String;
}

export interface SessionI {
  expires_at: number;
  auth_id: String;
  model: String;
  token: String;
  email: String;
  _id: String;
}

export type SessionT = SessionI | any;

export type LogoutT = Omit<LoginI, "password">;
export type VerifyEmailT = Omit<LoginI, "password">;
export type ActiveEmailT = { token: string };
export type ForgotPasswordT = Omit<LoginI, "password">;
export type ResetPasswordT = Pick<
  SessionI & { new_password: String },
  "token" | "new_password"
>;
