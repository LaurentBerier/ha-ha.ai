import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Lock, LogOut, Copy, Check } from 'lucide-react';

interface WaitlistEntry {
  id: string;
  email: string;
  createdAt: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'include',
      });
      if (!res.ok) {
        setError('Mot de passe incorrect');
        setLoading(false);
        return;
      }
      setPassword('');
      await fetchEntries();
      setAuthenticated(true);
    } catch {
      setError('Erreur de connexion');
    }
    setLoading(false);
  };

  const fetchEntries = async () => {
    const res = await fetch('/api/admin/waitlist', {
      credentials: 'include',
    });
    if (res.ok) {
      const data = await res.json();
      setEntries(data.entries);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    setAuthenticated(false);
    setEntries([]);
  };

  const copyEmails = () => {
    const emailList = entries.map((e) => e.email).join('\n');
    navigator.clipboard.writeText(emailList);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-muted-foreground" />
            <h1 className="text-xl font-semibold">Admin</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="input-admin-password"
            />
            {error && (
              <p className="text-sm text-destructive" data-testid="text-admin-error">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading} data-testid="button-admin-login">
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <h1 className="text-2xl font-bold">
            Liste d'attente ({entries.length})
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyEmails}
              data-testid="button-copy-emails"
            >
              {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? 'Copié' : 'Copier tout'}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              data-testid="button-admin-logout"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {entries.length === 0 ? (
          <p className="text-muted-foreground text-center py-12" data-testid="text-no-entries">
            Aucun email inscrit pour le moment.
          </p>
        ) : (
          <Card className="divide-y divide-border">
            {entries.map((entry, i) => (
              <div
                key={entry.id}
                className="flex items-center justify-between px-4 py-3 gap-4"
                data-testid={`row-email-${i}`}
              >
                <span className="text-sm font-medium truncate" data-testid={`text-email-${i}`}>
                  {entry.email}
                </span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(entry.createdAt).toLocaleDateString('fr-CA')}
                </span>
              </div>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
}
