import { http, setToken, clearToken } from "./client.js";

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface MeResponse {
  email: string;
  role: "admin" | "host";
}

const REFRESH_KEY = "nomox_refresh_token";

export async function login(username: string, password: string): Promise<void> {
  const res = await http.post<LoginResponse>("/login/password", { username, password });
  setToken(res.access_token);
  localStorage.setItem(REFRESH_KEY, res.refresh_token);
}

export async function requestOtp(email: string): Promise<void> {
  await http.post<void>("/login/otp/request", { email });
}

export async function verifyOtp(email: string, otp: string): Promise<void> {
  const res = await http.post<LoginResponse>("/login/otp/verify", { email, otp });
  setToken(res.access_token);
  localStorage.setItem(REFRESH_KEY, res.refresh_token);
}

export async function getMe(): Promise<MeResponse> {
  return http.get<MeResponse>("/auth/me");
}

export async function refresh(): Promise<boolean> {
  const refreshToken = localStorage.getItem(REFRESH_KEY);
  if (!refreshToken) return false;
  try {
    const res = await http.post<LoginResponse>("/auth/refresh", {
      refresh_token: refreshToken,
    });
    setToken(res.access_token);
    localStorage.setItem(REFRESH_KEY, res.refresh_token);
    return true;
  } catch {
    return false;
  }
}

export function logout(): void {
  clearToken();
  localStorage.removeItem(REFRESH_KEY);
}
