import { Download, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockPayslips } from '@/data/mock';

const fmt = (n: number) => new Intl.NumberFormat('fr-FR').format(n);

const statusVariant = (s: string) => {
  if (s === 'généré') return 'outline' as const;
  if (s === 'validé') return 'secondary' as const;
  return 'default' as const;
};

const Payslips = () => {
  return (
    <div>
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Bulletins de paie</h1>
          <p className="page-subtitle">Janvier 2026 — {mockPayslips.length} bulletins</p>
        </div>
        <Button variant="outline"><Download className="mr-2 h-4 w-4" />Tout télécharger</Button>
      </div>

      <div className="stat-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-3 font-medium text-muted-foreground">Employé</th>
              <th className="pb-3 font-medium text-muted-foreground">Période</th>
              <th className="pb-3 font-medium text-muted-foreground text-right">Brut</th>
              <th className="pb-3 font-medium text-muted-foreground text-right">Charges sal.</th>
              <th className="pb-3 font-medium text-muted-foreground text-right">Net</th>
              <th className="pb-3 font-medium text-muted-foreground">Statut</th>
              <th className="pb-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockPayslips.map(p => (
              <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors">
                <td className="py-3 font-medium text-foreground">{p.employee_name}</td>
                <td className="py-3 text-muted-foreground">{p.period}</td>
                <td className="py-3 text-right text-muted-foreground">{fmt(p.brut)} €</td>
                <td className="py-3 text-right text-muted-foreground">{fmt(p.charges_salariales)} €</td>
                <td className="py-3 text-right font-semibold text-foreground">{fmt(p.net)} €</td>
                <td className="py-3"><Badge variant={statusVariant(p.status)}>{p.status}</Badge></td>
                <td className="py-3">
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payslips;
