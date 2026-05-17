import { useTranslation } from '../../../core/i18n/presentation/use-translation';
import { useAuth } from '@presentation/auth/use-auth';

export const DashboardPage = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();

  return (
    <main>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
      <small>{t('dashboard_small')}</small>
    </main>
  );
};
