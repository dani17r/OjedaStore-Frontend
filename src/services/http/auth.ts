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

export const login = async (form: LoginI) => {
  const resp = await api.post("/auth/login", form);
  return resp.data;
};

export const logout = async (form: LogoutT) => {
  const resp = await api.post("/auth/logout", form);
  return resp.data;
};

export const status = async (token: string) => {
  const resp = await api.post(`/auth/status`, { token }).catch((data) => {
    if (Number(data.response.status) == 401) removeSession();
    return { data: false };
  });
  return resp.data;
};

export const verifyEmail = async (form: VerifyEmailT) => {
  const resp = await api.post(`/auth/email/verify`, form);
  return resp.data;
};

export const activeEmail = async (form: ActiveEmailT) => {
  const resp = await api.post(`/auth/email/active`, form);
  return resp.data;
};

export const forgotPassword = async (form: ForgotPasswordT) => {
  const resp = await api.post(`/auth/password/recovery`, form);
  return resp.data;
};

export const resetPassword = async (form: ResetPasswordT) => {
  const resp = await api.post(`/auth/password/reset`, form);
  return resp.data;
};
