export interface LoginI {
  password: String;
  email: String;
  model: String;
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
