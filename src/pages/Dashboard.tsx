import { Users, UserCheck, CalendarOff, Wallet, TrendingUp, PiggyBank } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '@/components/dashboard/StatCard';
import { mockStats, monthlyPayrollData, departmentDistribution, mockAbsences } from '@/data/mock';
import { Badge } from '@/components/ui/badge';

const fmt = (n: number) => new Intl.NumberFormat('fr-FR').format(n);

const absenceTypeLabels: Record<string, string> = {
  congé_payé: 'Congé payé',
  maladie: 'Maladie',
  sans_solde: 'Sans solde',
  maternité: 'Maternité',
  formation: 'Formation',
};

const statusVariant = (s: string) => {
  if (s === 'en_attente') return 'outline' as const;
  if (s === 'approuvé') return 'default' as const;
  return 'destructive' as const;
};

const Dashboard = () => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tableau de bord</h1>
        <p className="page-subtitle">Vue d'ensemble de la paie — Février 2026</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8">
        <StatCard icon={Users} title="Total employés" value={fmt(mockStats.total_employees)} />
        <StatCard icon={UserCheck} title="Actifs" value={fmt(mockStats.active_employees)} variant="accent" trend={{ value: '+2 ce mois', positive: true }} />
        <StatCard icon={CalendarOff} title="Absences en attente" value={String(mockStats.pending_absences)} />
        <StatCard icon={Wallet} title="Masse salariale brute" value={`${fmt(mockStats.current_payrun_total)} €`} />
        <StatCard icon={PiggyBank} title="Charges sociales" value={`${fmt(mockStats.monthly_charges)} €`} />
        <StatCard icon={TrendingUp} title="Salaire moyen" value={`${fmt(mockStats.avg_salary)} €`} variant="accent" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Chart: Masse salariale */}
        <div className="stat-card lg:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-4">Évolution de la masse salariale</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyPayrollData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v: number) => `${fmt(v)} €`} contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
              <Bar dataKey="brut" name="Brut" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="net" name="Net" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="charges" name="Charges" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie: Répartition par département */}
        <div className="stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Répartition par département</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={departmentDistribution} dataKey="count" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {departmentDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 grid grid-cols-2 gap-1">
            {departmentDistribution.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                {d.name} ({d.count})
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Absences récentes */}
      <div className="stat-card mt-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Demandes d'absence récentes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 font-medium text-muted-foreground">Employé</th>
                <th className="pb-3 font-medium text-muted-foreground">Type</th>
                <th className="pb-3 font-medium text-muted-foreground">Période</th>
                <th className="pb-3 font-medium text-muted-foreground">Jours</th>
                <th className="pb-3 font-medium text-muted-foreground">Statut</th>
              </tr>
            </thead>
            <tbody>
              {mockAbsences.map((a) => (
                <tr key={a.id} className="border-b border-border/50 last:border-0">
                  <td className="py-3 font-medium text-foreground">{a.employee_name}</td>
                  <td className="py-3 text-muted-foreground">{absenceTypeLabels[a.type] || a.type}</td>
                  <td className="py-3 text-muted-foreground">{a.start_date} → {a.end_date}</td>
                  <td className="py-3 text-muted-foreground">{a.days}</td>
                  <td className="py-3"><Badge variant={statusVariant(a.status)}>{a.status.replace('_', ' ')}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
