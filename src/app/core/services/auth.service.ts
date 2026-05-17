import { Injectable, signal, computed } from '@angular/core';

export type UserRole = 'Admin' | 'Customer';

type SessionUser = {
  name: string;
  email: string;
  role: UserRole;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'dw_session_user';
  private readonly userSignal = signal<SessionUser | null>(this.readFromStorage());

  readonly user = computed(() => this.userSignal());
  readonly isAuthenticated = computed(() => !!this.userSignal());
  readonly isAdmin = computed(() => this.userSignal()?.role === 'Admin');

  login(email: string, name = 'Customer'): void {
    const role: UserRole = email.toLowerCase().includes('admin') ? 'Admin' : 'Customer';
    const user = { name, email, role };
    this.userSignal.set(user);
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  logout(): void {
    this.userSignal.set(null);
    localStorage.removeItem(this.storageKey);
  }

  private readFromStorage(): SessionUser | null {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as SessionUser;
    } catch {
      return null;
    }
  }
}
