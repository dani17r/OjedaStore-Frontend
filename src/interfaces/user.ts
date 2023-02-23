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

export interface CityI {
  name: string;
  id: number;
}

export interface StateI {
  cities: CityI[];
  state_code: string;
  name: string;
  id: number;
}

export interface CountryI {
  states: StateI[];
  name: string;
  iso3: string;
  id: number;
}

export type CountryT = Omit<CountryI, "states"> | null;
export type StateT = Omit<StateI, "cities"> | null;
export type CityT = CityI | null;

export interface LocationI {
  references: string;
  country: CountryT;
  address: string;
  state: StateT;
  city: CityT;
}

export interface RecordsI {
  cedula: number;
  passport: number;
  id: number;
}

export interface UserI {
  verifiedAt: string | null;
  locations: LocationI[];
  expires_at: string;
  createdAt: string;
  birthDate: string;
  updatedAt: string;
  recovery: boolean;
  records: RecordsI;
  phones: string[];
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

export interface StateStoreI {
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
