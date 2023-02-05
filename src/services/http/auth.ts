import { ForgotPasswordT, ResetPasswordT, LoginI } from "@interfaces/auth";
import { removeSession } from "@tools/utils";
import { useMemoize } from "@vueuse/core";
import { api } from "@boot/axios";

export const login = async (form: LoginI, model: string) => {
  api.defaults.headers["model"] = model;
  const resp = await api.post("/auth/login", form);
  return resp.data;
};

export const logout = async (email: string, model: string) => {
  api.defaults.headers["model"] = model;
  const resp = await api.post("/auth/logout", { email });
  return resp.data;
};

export const status = useMemoize(async (model: string) => {
  api.defaults.headers["model"] = model;
  const resp = await api.get(`/auth/status`).catch((data) => {
    if (Number(data.response.status) == 401) removeSession(model);
    return { data: false };
  });
  return resp.data;
});

export const verifyEmail = async (email: string, model: string) => {
  api.defaults.headers["model"] = model;
  const resp = await api.post(`/auth/email/verify`, { email });
  return resp.data;
};

export const activeEmail = async (token: string, model: string) => {
  api.defaults.headers["model"] = model;
  const resp = await api.post(`/auth/email/active`, { token });
  return resp.data;
};

export const forgotPassword = async (form: ForgotPasswordT, model: string) => {
  api.defaults.headers["model"] = model;
  const resp = await api.post(`/auth/password/recovery`, form);
  return resp.data;
};

export const resetPassword = async (form: ResetPasswordT, model: string) => {
  api.defaults.headers["model"] = model;
  const resp = await api.post(`/auth/password/reset`, form);
  return resp.data;
};
