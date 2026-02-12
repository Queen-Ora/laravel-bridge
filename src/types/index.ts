// Types alignés avec le modèle de données du cahier des charges
// Facilement mappable aux modèles Laravel/Eloquent

export interface Company {
  id: number;
  name: string;
  siret: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: number;
  company_id: number;
  matricule: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  date_of_birth: string;
  hire_date: string;
  department: string;
  position: string;
  status: 'actif' | 'inactif' | 'suspendu';
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface Contract {
  id: number;
  employee_id: number;
  type: 'CDI' | 'CDD' | 'Stage' | 'Alternance';
  start_date: string;
  end_date?: string;
  base_salary: number;
  work_hours: number;
  status: 'actif' | 'terminé' | 'suspendu';
}

export interface SalaryComponent {
  id: number;
  name: string;
  type: 'prime' | 'indemnité' | 'retenue' | 'cotisation';
  is_percentage: boolean;
  value: number;
  is_taxable: boolean;
}

export interface PayRun {
  id: number;
  company_id: number;
  period: string; // "2026-01"
  status: 'brouillon' | 'en_cours' | 'validé' | 'clôturé';
  total_brut: number;
  total_net: number;
  total_charges: number;
  employee_count: number;
  created_at: string;
  validated_at?: string;
}

export interface Payslip {
  id: number;
  pay_run_id: number;
  employee_id: number;
  employee_name: string;
  period: string;
  brut: number;
  net: number;
  charges_salariales: number;
  charges_patronales: number;
  status: 'généré' | 'validé' | 'envoyé';
}

export interface Absence {
  id: number;
  employee_id: number;
  employee_name: string;
  type: 'congé_payé' | 'maladie' | 'sans_solde' | 'maternité' | 'formation';
  start_date: string;
  end_date: string;
  days: number;
  status: 'en_attente' | 'approuvé' | 'refusé';
  reason?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'rh' | 'manager' | 'employe';
}

export interface DashboardStats {
  total_employees: number;
  active_employees: number;
  pending_absences: number;
  current_payrun_total: number;
  monthly_charges: number;
  avg_salary: number;
}

// Type pour les réponses API Laravel paginées
export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// Type pour les réponses API Laravel
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
