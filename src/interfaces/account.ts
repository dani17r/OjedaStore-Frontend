import { LifecyclesI } from "@interfaces/general";
import { LoginI } from "@interfaces/auth";

export interface ImagesI {
  avatar?: String;
}

export interface RecordsI {
  cedula?: Number;
  passport?: Number;
  id?: Number;
}

export interface AccountI {
  verifiedAt?: String | null;
  expires_at?: String;
  createdAt?: String;
  birthDate?: String;
  updatedAt?: String;
  recovery?: Boolean;
  records?: RecordsI;
  phones?: String[];
  locations?: any[];
  images?: ImagesI;
  fullname: String;
  username: String;
  model: String;
  email: String;
  _id?: String;
}

export type CreateAccountI = Omit<
  AccountI & LoginI,
  | "expires_at"
  | "verifiedAt"
  | "createdAt"
  | "updatedAt"
  | "recovery"
  | "_id"
  | "model"
>;

export type UpdateAccountI = Omit<
  AccountI & LoginI,
  | "expires_at"
  | "verifiedAt"
  | "createdAt"
  | "updatedAt"
  | "recovery"
  | "password"
  | "model"
  | "_id"
>;

export interface StateI {
  lifecycles: LifecyclesI;
  account: AccountT;
}

export type AccountT = AccountI | null;
