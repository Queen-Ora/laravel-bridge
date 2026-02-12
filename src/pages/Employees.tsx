import { useState } from 'react';
import { Search, Plus, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockEmployees } from '@/data/mock';
import type { Employee } from '@/types';

const statusLabel: Record<string, string> = { actif: 'Actif', inactif: 'Inactif', suspendu: 'Suspendu' };
const statusVariant = (s: string) => s === 'actif' ? 'default' as const : s === 'inactif' ? 'secondary' as const : 'destructive' as const;

const Employees = () => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState<string>('all');

  const departments = [...new Set(mockEmployees.map(e => e.department))];

  const filtered = mockEmployees.filter(e => {
    const matchSearch = `${e.first_name} ${e.last_name} ${e.matricule} ${e.email}`.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'all' || e.department === deptFilter;
    return matchSearch && matchDept;
  });

  return (
    <div>
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Employés</h1>
          <p className="page-subtitle">{mockEmployees.length} employés enregistrés</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Ajouter</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader><DialogTitle>Nouvel employé</DialogTitle></DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div><Label>Prénom</Label><Input placeholder="Prénom" className="mt-1.5" /></div>
              <div><Label>Nom</Label><Input placeholder="Nom" className="mt-1.5" /></div>
              <div><Label>Email</Label><Input type="email" placeholder="email@jmoney.com" className="mt-1.5" /></div>
              <div><Label>Téléphone</Label><Input placeholder="+225 ..." className="mt-1.5" /></div>
              <div><Label>Département</Label><Input placeholder="Finance, IT, RH..." className="mt-1.5" /></div>
              <div><Label>Poste</Label><Input placeholder="Intitulé du poste" className="mt-1.5" /></div>
              <div><Label>Date d'embauche</Label><Input type="date" className="mt-1.5" /></div>
              <div><Label>Date de naissance</Label><Input type="date" className="mt-1.5" /></div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Annuler</Button>
              <Button>Enregistrer</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={deptFilter} onValueChange={setDeptFilter}>
          <SelectTrigger className="w-48"><SelectValue placeholder="Département" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les départements</SelectItem>
            {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="stat-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-3 font-medium text-muted-foreground">Matricule</th>
              <th className="pb-3 font-medium text-muted-foreground">Nom complet</th>
              <th className="pb-3 font-medium text-muted-foreground">Email</th>
              <th className="pb-3 font-medium text-muted-foreground">Département</th>
              <th className="pb-3 font-medium text-muted-foreground">Poste</th>
              <th className="pb-3 font-medium text-muted-foreground">Statut</th>
              <th className="pb-3 font-medium text-muted-foreground">Embauche</th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors">
                <td className="py-3 font-mono text-xs text-muted-foreground">{e.matricule}</td>
                <td className="py-3 font-medium text-foreground">{e.first_name} {e.last_name}</td>
                <td className="py-3 text-muted-foreground">{e.email}</td>
                <td className="py-3 text-muted-foreground">{e.department}</td>
                <td className="py-3 text-muted-foreground">{e.position}</td>
                <td className="py-3"><Badge variant={statusVariant(e.status)}>{statusLabel[e.status]}</Badge></td>
                <td className="py-3 text-muted-foreground">{e.hire_date}</td>
                <td className="py-3">
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-8 text-center text-muted-foreground">Aucun employé trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default Employees;
