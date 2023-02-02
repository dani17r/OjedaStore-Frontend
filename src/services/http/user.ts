import { CreateUserI, ImageT, nameImage, UpdateUserI } from "@interfaces/user";
import { Coordinates, CropperResult } from "vue-advanced-cropper";
import { QueryI } from "@interfaces/general";
import { api } from "@boot/axios";

api.defaults.headers["model"] = "users";

export const one = async (_id: string, query?: QueryI) => {
  const isQuery = query ? `?${query}` : "";
  const resp = await api
    .get(`/users/${_id}${isQuery}`)
    .catch(() => ({ data: null }));
  return resp.data;
};

export const create = async (form: CreateUserI) => {
  const resp = await api.post("/users", form);
  return resp.data;
};

export const update = async (_id: string, form: UpdateUserI) => {
  const resp = await api.post(`/users/${_id}`, form);
  return resp.data;
};

type ImagesT = {
  [key in nameImage]?: {
    coordinates: Partial<Coordinates>;
    image: Partial<CropperResult["image"]>;
  };
};

interface UploadImageI {
  data: {
    coordinates: Partial<Coordinates>;
    image: Partial<CropperResult["image"]>;
  };
  field: string;
  _id: string;
  file: Blob;
}

export const uploadImage = async (formData: UploadImageI) => {
  const form = new FormData();
  form.append("data", String(JSON.stringify(formData.data)));
  form.append("file", formData.file);
  form.append("_id", formData._id);
  const resp = await api
    .post(`/users/upload/${formData.field}`, form)
    .catch(() => ({ data: null }));
  return resp.data;
};

export const updateImage = async (formData: Omit<UploadImageI, "file">) => {
  const form = {
    data: JSON.stringify(formData.data),
    _id: formData._id,
  };

  const resp = await api
    .post(`/users/update/image/${formData.field}`, form)
    .catch(() => ({ data: null }));
  return resp.data;
};

export const remove = async (_id: string) => {
  const resp = await api.delete(`/users/${_id}`);
  return resp.data;
};
