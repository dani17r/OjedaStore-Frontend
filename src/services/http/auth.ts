import { LoginI, LogoutT, VerifyEmailT, ActiveEmailT } from "@interfaces/auth";
import { removeSession } from "@tools/utils";
import { api } from "@boot/axios";

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
