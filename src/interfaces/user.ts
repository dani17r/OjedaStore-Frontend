import { Coordinates, CropperResult } from "vue-advanced-cropper";
import { LifecyclesI } from "@interfaces/general";
import { LoginI } from "@interfaces/auth";

export type ImageT = {
  coordinates: Partial<Coordinates> | null;
  image: Partial<CropperResult["image"]> | null;
};

export interface ImagesI {
  avatar: ImageT;
  herou: ImageT;
}

export interface RecordsI {
  cedula: number;
  passport: number;
  id: number;
}

export interface UserI {
  verifiedAt: string | null;
  expires_at: string;
  createdAt: string;
  birthDate: string;
  updatedAt: string;
  recovery: boolean;
  records: RecordsI;
  phones: string[];
  locations: any[];
  fullname: string;
  username: string;
  images: ImagesI;
  gender: string;
  email: string;
  role: string;
  _id: string;
}

export type CreateUserI = Omit<
  UserI & LoginI,
  "expires_at" | "verifiedAt" | "createdAt" | "updatedAt" | "recovery" | "_id"
>;

export type UpdateUserI = Omit<
  UserI & LoginI,
  | "expires_at"
  | "verifiedAt"
  | "createdAt"
  | "updatedAt"
  | "recovery"
  | "password"
  | "_id"
>;

export type UserT = UserI | null;

export type nameImage = "herou" | "avatar";
export type profileFields = keyof Omit<UserI, "_id">;

export interface StateI {
  lifecycles: LifecyclesI;
  profile: UserT;
  user: UserT;
}

// type subUpdateUserI = {
//   [Property in keyof UpdateUserI]?: UpdateUserI[Property];
// };

// type ImagesT = {
//   [key in nameImage]?: {
//     coordinates: Partial<Coordinates>;
//     image: Partial<CropperResult["image"]>;
//   };
// };

export interface UploadImageI {
  data: {
    coordinates: Partial<Coordinates>;
    image: Partial<CropperResult["image"]>;
  };
  field: string;
  _id: string;
  file: Blob;
}
