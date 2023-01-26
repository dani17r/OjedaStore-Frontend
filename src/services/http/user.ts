import { CreateUserI, UpdateUserI } from "@interfaces/user";
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

export const update = async (_id: number, form: UpdateUserI) => {
  const resp = await api.post(`/users/${_id}`, form);
  return resp.data;
};

export const remove = async (_id: number) => {
  const resp = await api.delete(`/users/${_id}`);
  return resp.data;
};
