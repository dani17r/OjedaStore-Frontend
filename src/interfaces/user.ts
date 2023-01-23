import { LifecyclesI } from "@interfaces/general";
import { LoginI } from "@interfaces/auth";

export interface ImagesI {
  avatar?: string;
  header?: string;
}

export interface RecordsI {
  cedula?: number;
  passport?: number;
  id?: number;
}

export interface UserI {
  verifiedAt?: string | null;
  expires_at?: string;
  createdAt?: string;
  birthDate?: string;
  updatedAt?: string;
  recovery?: boolean;
  records?: RecordsI;
  phones?: string[];
  locations?: any[];
  images?: ImagesI;
  fullname: string;
  username: string;
  email: string;
  _id?: string;
}

export type CreateUserI = Omit<
  UserI & LoginI,
  | "expires_at"
  | "verifiedAt"
  | "createdAt"
  | "updatedAt"
  | "recovery"
  | "_id"
  | "model"
>;

export type UpdateUserI = Omit<
  UserI & LoginI,
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
  profile: UserT;
  user: UserT;
}

export type UserT = UserI | null;
