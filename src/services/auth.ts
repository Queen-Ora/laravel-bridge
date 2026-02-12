/**
 * Service d'authentification — Laravel Sanctum
 *
 * Pour connecter à Laravel :
 * 1. Configurer SANCTUM_STATEFUL_DOMAINS dans Laravel
 * 2. Appeler /sanctum/csrf-cookie avant login (SPA mode)
 * 3. Ou utiliser les tokens API (token mode)
 */

import { setAuthToken } from './api';
import type { User } from '@/types';

const API_BASE_URL = '/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

// ─── CSRF Cookie (SPA mode) ─────────────────────────────
async function getCsrfCookie(): Promise<void> {
  await fetch('/sanctum/csrf-cookie', { credentials: 'include' });
}

// ─── Login ───────────────────────────────────────────────
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  // TODO: Décommenter pour Laravel SPA mode
  // await getCsrfCookie();

  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Identifiants incorrects');
  }

  const data: AuthResponse = await response.json();
  setAuthToken(data.token);
  localStorage.setItem('auth_token', data.token);
  localStorage.setItem('auth_user', JSON.stringify(data.user));
  return data;
}

// ─── Logout ──────────────────────────────────────────────
export async function logout(): Promise<void> {
  try {
    const token = localStorage.getItem('auth_token');
    if (token) {
      await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });
    }
  } catch {
    // Silently fail — we clear local state regardless
  } finally {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setAuthToken('');
  }
}

// ─── Restore session ─────────────────────────────────────
export function restoreSession(): { user: User; token: string } | null {
  const token = localStorage.getItem('auth_token');
  const userJson = localStorage.getItem('auth_user');
  if (token && userJson) {
    try {
      const user = JSON.parse(userJson) as User;
      setAuthToken(token);
      return { user, token };
    } catch {
      return null;
    }
  }
  return null;
}

// ─── Get current user ────────────────────────────────────
export function getCurrentUser(): User | null {
  const userJson = localStorage.getItem('auth_user');
  if (userJson) {
    try {
      return JSON.parse(userJson) as User;
    } catch {
      return null;
    }
  }
  return null;
}
