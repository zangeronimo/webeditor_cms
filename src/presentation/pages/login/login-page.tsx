import { useState } from 'react';
import { useTranslation } from '../../../core/i18n/presentation/use-translation';
import { useAuth } from '@presentation/auth/use-auth';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { t } = useTranslation();
  const { login } = useAuth();

  function handleSubmit() {
    login({ email, password });
  }
  return (
    <main>
      <h1>{t('login_title')}</h1>
      <label>{t('login_email')}</label>
      <input
        type="email"
        placeholder={t('login_email')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>{t('login_password')}</label>
      <input
        type="password"
        placeholder={t('login_password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={handleSubmit}>
        {t('login_button')}
      </button>
    </main>
  );
};
