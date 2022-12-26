import { CreateAccountI, UpdateAccountI } from "@interfaces/account";
import { QueryI } from "@interfaces/general";
import { api } from "@boot/axios";

export const one = async (_id: string, query?: QueryI) => {
  const resp = await api.get(`/accounts/${_id}?${query}`);
  return resp.data;
};

export const create = async (form: CreateAccountI) => {
  const resp = await api.post("/accounts", form);
  return resp.data;
};

export const update = async (_id: number, form: UpdateAccountI) => {
  const resp = await api.post(`/accounts/${_id}`, form);
  return resp.data;
};

export const remove = async (_id: number) => {
  const resp = await api.delete(`/accounts/${_id}`);
  return resp.data;
};
