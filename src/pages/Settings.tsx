import { Building2, Shield, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Paramètres</h1>
        <p className="page-subtitle">Configuration de l'entreprise et de l'application</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        {/* Entreprise */}
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold font-display text-foreground">Entreprise</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Nom de l'entreprise</Label><Input defaultValue="JMONEY" className="mt-1.5" /></div>
            <div><Label>SIRET</Label><Input defaultValue="123 456 789 00012" className="mt-1.5" /></div>
            <div className="col-span-2"><Label>Adresse</Label><Input defaultValue="Abidjan, Cocody, Côte d'Ivoire" className="mt-1.5" /></div>
          </div>
        </div>

        {/* Sécurité */}
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold font-display text-foreground">Sécurité</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Authentification à deux facteurs</p>
                <p className="text-xs text-muted-foreground">Renforce la sécurité de votre compte</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Journalisation des accès</p>
                <p className="text-xs text-muted-foreground">Enregistrer toutes les connexions</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Bell className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold font-display text-foreground">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Email de validation de paie</p>
                <p className="text-xs text-muted-foreground">Notifier à chaque validation</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Alertes d'absence</p>
                <p className="text-xs text-muted-foreground">Nouvelles demandes d'absence</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Sauvegarder</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
