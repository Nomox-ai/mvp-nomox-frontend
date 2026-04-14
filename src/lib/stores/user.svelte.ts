import { getMe, logout, type MeResponse } from "$lib/api/auth.js";
import { getToken } from "$lib/api/client.js";

type UserRole = "admin" | "host";

class UserStore {
  email = $state<string | null>(null);
  role = $state<UserRole | null>(null);
  loading = $state(false);

  get isAdmin(): boolean {
    return this.role === "admin";
  }

  get isHost(): boolean {
    return this.role === "host";
  }

  get isLoggedIn(): boolean {
    return this.email !== null;
  }

  /** Fetch /auth/me and populate the store. Safe to call on every page load. */
  async load(): Promise<void> {
    if (!getToken()) return;
    this.loading = true;
    try {
      const me = await getMe();
      this.email = me.email;
      this.role = me.role;
    } catch {
      // Token invalid / expired — clear state
      this.email = null;
      this.role = null;
    } finally {
      this.loading = false;
    }
  }

  /** Set user directly after login to avoid an extra round-trip. */
  set(me: MeResponse): void {
    this.email = me.email;
    this.role = me.role;
  }

  /** Clear state and tokens on logout. */
  signOut(): void {
    logout();
    this.email = null;
    this.role = null;
  }
}

export const user = new UserStore();
