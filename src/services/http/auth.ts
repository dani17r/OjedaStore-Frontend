import { removeSession } from "@tools/utils";
import { api } from "@boot/axios";
import {
  ForgotPasswordT,
  ResetPasswordT,
  ActiveEmailT,
  VerifyEmailT,
  LogoutT,
  LoginI,
} from "@interfaces/auth";

export const login = async (form: LoginI, model: string) => {
  api.defaults.headers["model"] = model;
  const resp = await api.post("/auth/login", form);
  return resp.data;
};

export const logout = async (form: LogoutT, model: string) => {
  api.defaults.headers["model"] = model;
  const resp = await api.post("/auth/logout", form);
  return resp.data;
};

export const status = async (model: string) => {
  api.defaults.headers["model"] = model;
  const resp = await api.get(`/auth/status`).catch((data) => {
    if (Number(data.response.status) == 401) removeSession(model);
    return { data: false };
  });
  return resp.data;
};

export const verifyEmail = async (email: string, model: string) => {
  api.defaults.headers["model"] = model;
  const resp = await api.post(`/auth/email/verify`, { email });
  return resp.data;
};

export const activeEmail = async (form: ActiveEmailT, model: string) => {
  api.defaults.headers["model"] = model;
  const resp = await api.post(`/auth/email/active`, form);
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
