import { Play, CheckCircle, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockPayRuns } from '@/data/mock';
import { Link } from 'react-router-dom';

const fmt = (n: number) => new Intl.NumberFormat('fr-FR').format(n);

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
  brouillon: { label: 'Brouillon', variant: 'outline' },
  en_cours: { label: 'En cours', variant: 'secondary' },
  validé: { label: 'Validé', variant: 'default' },
  clôturé: { label: 'Clôturé', variant: 'default' },
};

const PayRuns = () => {
  return (
    <div>
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Exécution de paie</h1>
          <p className="page-subtitle">Gérez les campagnes de paie mensuelles</p>
        </div>
        <Button><Play className="mr-2 h-4 w-4" />Lancer une paie</Button>
      </div>

      <div className="grid gap-4">
        {mockPayRuns.map(pr => {
          const cfg = statusConfig[pr.status] || statusConfig.brouillon;
          return (
            <div key={pr.id} className="stat-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground font-display">
                      Paie — {pr.period}
                    </h3>
                    <p className="text-sm text-muted-foreground">{pr.employee_count} employés</p>
                  </div>
                  <Badge variant={cfg.variant}>{cfg.label}</Badge>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Brut total</p>
                    <p className="text-lg font-bold text-foreground">{fmt(pr.total_brut)} €</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Net total</p>
                    <p className="text-lg font-bold text-accent">{fmt(pr.total_net)} €</p>
                  </div>
                  <div className="flex gap-2">
                    {pr.status === 'clôturé' && (
                      <Link to="/bulletins">
                        <Button size="sm" variant="outline"><Eye className="mr-1 h-3 w-3" />Bulletins</Button>
                      </Link>
                    )}
                    {pr.status === 'brouillon' && (
                      <Button size="sm"><CheckCircle className="mr-1 h-3 w-3" />Calculer</Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PayRuns;
