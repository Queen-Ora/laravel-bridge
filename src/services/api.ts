/**
 * Service API centralisé — prêt pour connexion Laravel
 * 
 * Pour connecter à Laravel :
 * 1. Modifier API_BASE_URL pour pointer vers votre backend
 * 2. Ajouter le token CSRF/Bearer dans les headers
 * 3. Les endpoints suivent la convention Laravel Resource Controllers
 * 
 * Routes Laravel correspondantes :
 *   Route::apiResource('employees', EmployeeController::class);
 *   Route::apiResource('absences', AbsenceController::class);
 *   Route::apiResource('pay-runs', PayRunController::class);
 *   Route::apiResource('payslips', PayslipController::class);
 *   Route::get('dashboard/stats', [DashboardController::class, 'stats']);
 */

import type {
  Employee, Absence, PayRun, Payslip,
  DashboardStats, PaginatedResponse, ApiResponse
} from '@/types';

// TODO: Remplacer par l'URL de votre API Laravel
const API_BASE_URL = '/api';

// Token d'authentification (Laravel Sanctum)
let authToken: string | null = null;

export const setAuthToken = (token: string) => {
  authToken = token;
};

const headers = (): HeadersInit => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
});

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: { ...headers(), ...options?.headers },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// ─── Dashboard ───────────────────────────────────────────
export const dashboardApi = {
  getStats: () => request<ApiResponse<DashboardStats>>('/dashboard/stats'),
};

// ─── Employés ────────────────────────────────────────────
export const employeesApi = {
  list: (page = 1) => request<PaginatedResponse<Employee>>(`/employees?page=${page}`),
  get: (id: number) => request<ApiResponse<Employee>>(`/employees/${id}`),
  create: (data: Partial<Employee>) => request<ApiResponse<Employee>>('/employees', {
    method: 'POST', body: JSON.stringify(data),
  }),
  update: (id: number, data: Partial<Employee>) => request<ApiResponse<Employee>>(`/employees/${id}`, {
    method: 'PUT', body: JSON.stringify(data),
  }),
  delete: (id: number) => request<void>(`/employees/${id}`, { method: 'DELETE' }),
};

// ─── Absences ────────────────────────────────────────────
export const absencesApi = {
  list: (page = 1) => request<PaginatedResponse<Absence>>(`/absences?page=${page}`),
  create: (data: Partial<Absence>) => request<ApiResponse<Absence>>('/absences', {
    method: 'POST', body: JSON.stringify(data),
  }),
  approve: (id: number) => request<ApiResponse<Absence>>(`/absences/${id}/approve`, {
    method: 'PATCH',
  }),
  reject: (id: number) => request<ApiResponse<Absence>>(`/absences/${id}/reject`, {
    method: 'PATCH',
  }),
};

// ─── Paie ────────────────────────────────────────────────
export const payRunsApi = {
  list: (page = 1) => request<PaginatedResponse<PayRun>>(`/pay-runs?page=${page}`),
  create: (data: Partial<PayRun>) => request<ApiResponse<PayRun>>('/pay-runs', {
    method: 'POST', body: JSON.stringify(data),
  }),
  validate: (id: number) => request<ApiResponse<PayRun>>(`/pay-runs/${id}/validate`, {
    method: 'PATCH',
  }),
};

// ─── Bulletins ───────────────────────────────────────────
export const payslipsApi = {
  list: (payRunId: number) => request<PaginatedResponse<Payslip>>(`/pay-runs/${payRunId}/payslips`),
  download: (id: number) => request<Blob>(`/payslips/${id}/pdf`),
};
