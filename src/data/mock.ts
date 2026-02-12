import type { Employee, Absence, PayRun, Payslip, DashboardStats } from '@/types';

export const mockStats: DashboardStats = {
  total_employees: 156,
  active_employees: 148,
  pending_absences: 12,
  current_payrun_total: 485200,
  monthly_charges: 198400,
  avg_salary: 3278,
};

export const mockEmployees: Employee[] = [
  { id: 1, company_id: 1, matricule: 'EMP001', first_name: 'Aminata', last_name: 'Diallo', email: 'a.diallo@jmoney.com', phone: '+225 07 00 00 01', date_of_birth: '1990-03-15', hire_date: '2022-01-10', department: 'Finance', position: 'Comptable Senior', status: 'actif', created_at: '2022-01-10', updated_at: '2024-06-01' },
  { id: 2, company_id: 1, matricule: 'EMP002', first_name: 'Kouadio', last_name: 'Yao', email: 'k.yao@jmoney.com', phone: '+225 07 00 00 02', date_of_birth: '1988-07-22', hire_date: '2021-06-15', department: 'IT', position: 'Développeur Full Stack', status: 'actif', created_at: '2021-06-15', updated_at: '2024-06-01' },
  { id: 3, company_id: 1, matricule: 'EMP003', first_name: 'Fatou', last_name: 'Koné', email: 'f.kone@jmoney.com', phone: '+225 07 00 00 03', date_of_birth: '1995-11-08', hire_date: '2023-03-01', department: 'RH', position: 'Chargée de Recrutement', status: 'actif', created_at: '2023-03-01', updated_at: '2024-06-01' },
  { id: 4, company_id: 1, matricule: 'EMP004', first_name: 'Jean-Marc', last_name: 'Bamba', email: 'jm.bamba@jmoney.com', phone: '+225 07 00 00 04', date_of_birth: '1985-01-30', hire_date: '2020-09-01', department: 'Direction', position: 'Directeur Commercial', status: 'actif', created_at: '2020-09-01', updated_at: '2024-06-01' },
  { id: 5, company_id: 1, matricule: 'EMP005', first_name: 'Mariam', last_name: 'Touré', email: 'm.toure@jmoney.com', phone: '+225 07 00 00 05', date_of_birth: '1992-06-18', hire_date: '2022-11-01', department: 'Finance', position: 'Analyste Financier', status: 'actif', created_at: '2022-11-01', updated_at: '2024-06-01' },
  { id: 6, company_id: 1, matricule: 'EMP006', first_name: 'Issa', last_name: 'Ouattara', email: 'i.ouattara@jmoney.com', phone: '+225 07 00 00 06', date_of_birth: '1991-09-12', hire_date: '2023-07-15', department: 'IT', position: 'Admin Système', status: 'actif', created_at: '2023-07-15', updated_at: '2024-06-01' },
  { id: 7, company_id: 1, matricule: 'EMP007', first_name: 'Clémentine', last_name: 'Aka', email: 'c.aka@jmoney.com', date_of_birth: '1993-04-25', hire_date: '2021-02-01', department: 'Marketing', position: 'Responsable Communication', status: 'inactif', created_at: '2021-02-01', updated_at: '2024-06-01' },
  { id: 8, company_id: 1, matricule: 'EMP008', first_name: 'Moussa', last_name: 'Sangaré', email: 'm.sangare@jmoney.com', date_of_birth: '1987-12-03', hire_date: '2019-05-01', department: 'Logistique', position: 'Chef Logistique', status: 'actif', created_at: '2019-05-01', updated_at: '2024-06-01' },
];

export const mockAbsences: Absence[] = [
  { id: 1, employee_id: 1, employee_name: 'Aminata Diallo', type: 'congé_payé', start_date: '2026-02-15', end_date: '2026-02-22', days: 5, status: 'en_attente', reason: 'Vacances familiales' },
  { id: 2, employee_id: 3, employee_name: 'Fatou Koné', type: 'maladie', start_date: '2026-02-10', end_date: '2026-02-12', days: 2, status: 'approuvé' },
  { id: 3, employee_id: 5, employee_name: 'Mariam Touré', type: 'formation', start_date: '2026-03-01', end_date: '2026-03-05', days: 5, status: 'en_attente', reason: 'Formation Excel avancé' },
  { id: 4, employee_id: 2, employee_name: 'Kouadio Yao', type: 'congé_payé', start_date: '2026-02-24', end_date: '2026-02-28', days: 4, status: 'approuvé' },
  { id: 5, employee_id: 6, employee_name: 'Issa Ouattara', type: 'sans_solde', start_date: '2026-03-10', end_date: '2026-03-14', days: 4, status: 'refusé', reason: 'Raisons personnelles' },
];

export const mockPayRuns: PayRun[] = [
  { id: 1, company_id: 1, period: '2026-01', status: 'clôturé', total_brut: 485200, total_net: 362800, total_charges: 198400, employee_count: 148, created_at: '2026-01-25', validated_at: '2026-01-30' },
  { id: 2, company_id: 1, period: '2025-12', status: 'clôturé', total_brut: 478900, total_net: 358100, total_charges: 195600, employee_count: 146, created_at: '2025-12-25', validated_at: '2025-12-30' },
  { id: 3, company_id: 1, period: '2026-02', status: 'brouillon', total_brut: 0, total_net: 0, total_charges: 0, employee_count: 148, created_at: '2026-02-10' },
];

export const mockPayslips: Payslip[] = [
  { id: 1, pay_run_id: 1, employee_id: 1, employee_name: 'Aminata Diallo', period: '2026-01', brut: 3800, net: 2850, charges_salariales: 570, charges_patronales: 950, status: 'envoyé' },
  { id: 2, pay_run_id: 1, employee_id: 2, employee_name: 'Kouadio Yao', period: '2026-01', brut: 4200, net: 3150, charges_salariales: 630, charges_patronales: 1050, status: 'envoyé' },
  { id: 3, pay_run_id: 1, employee_id: 3, employee_name: 'Fatou Koné', period: '2026-01', brut: 2800, net: 2100, charges_salariales: 420, charges_patronales: 700, status: 'validé' },
  { id: 4, pay_run_id: 1, employee_id: 4, employee_name: 'Jean-Marc Bamba', period: '2026-01', brut: 5500, net: 4125, charges_salariales: 825, charges_patronales: 1375, status: 'envoyé' },
  { id: 5, pay_run_id: 1, employee_id: 5, employee_name: 'Mariam Touré', period: '2026-01', brut: 3200, net: 2400, charges_salariales: 480, charges_patronales: 800, status: 'généré' },
];

export const monthlyPayrollData = [
  { month: 'Sep', brut: 420000, net: 315000, charges: 171000 },
  { month: 'Oct', brut: 435000, net: 326000, charges: 177000 },
  { month: 'Nov', brut: 450000, net: 337000, charges: 183000 },
  { month: 'Déc', brut: 478900, net: 358100, charges: 195600 },
  { month: 'Jan', brut: 485200, net: 362800, charges: 198400 },
  { month: 'Fév', brut: 0, net: 0, charges: 0 },
];

export const departmentDistribution = [
  { name: 'Finance', count: 32, color: 'hsl(var(--chart-1))' },
  { name: 'IT', count: 28, color: 'hsl(var(--chart-2))' },
  { name: 'RH', count: 18, color: 'hsl(var(--chart-3))' },
  { name: 'Commercial', count: 35, color: 'hsl(var(--chart-4))' },
  { name: 'Logistique', count: 22, color: 'hsl(var(--chart-5))' },
  { name: 'Autres', count: 13, color: 'hsl(var(--muted-foreground))' },
];
