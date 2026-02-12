import { Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockAbsences } from '@/data/mock';

const typeLabels: Record<string, string> = {
  congé_payé: 'Congé payé', maladie: 'Maladie', sans_solde: 'Sans solde', maternité: 'Maternité', formation: 'Formation',
};

const statusVariant = (s: string) => {
  if (s === 'en_attente') return 'outline' as const;
  if (s === 'approuvé') return 'default' as const;
  return 'destructive' as const;
};

const statusLabel: Record<string, string> = { en_attente: 'En attente', approuvé: 'Approuvé', refusé: 'Refusé' };

const Absences = () => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Gestion des absences</h1>
        <p className="page-subtitle">{mockAbsences.filter(a => a.status === 'en_attente').length} demandes en attente d'approbation</p>
      </div>

      <div className="stat-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-3 font-medium text-muted-foreground">Employé</th>
              <th className="pb-3 font-medium text-muted-foreground">Type</th>
              <th className="pb-3 font-medium text-muted-foreground">Début</th>
              <th className="pb-3 font-medium text-muted-foreground">Fin</th>
              <th className="pb-3 font-medium text-muted-foreground">Jours</th>
              <th className="pb-3 font-medium text-muted-foreground">Motif</th>
              <th className="pb-3 font-medium text-muted-foreground">Statut</th>
              <th className="pb-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockAbsences.map(a => (
              <tr key={a.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors">
                <td className="py-3 font-medium text-foreground">{a.employee_name}</td>
                <td className="py-3 text-muted-foreground">{typeLabels[a.type]}</td>
                <td className="py-3 text-muted-foreground">{a.start_date}</td>
                <td className="py-3 text-muted-foreground">{a.end_date}</td>
                <td className="py-3 text-muted-foreground">{a.days}</td>
                <td className="py-3 text-muted-foreground max-w-[200px] truncate">{a.reason || '—'}</td>
                <td className="py-3"><Badge variant={statusVariant(a.status)}>{statusLabel[a.status]}</Badge></td>
                <td className="py-3">
                  {a.status === 'en_attente' && (
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-success hover:text-success">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive hover:text-destructive">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Absences;
