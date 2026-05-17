import { render } from '@testing-library/react';
import { Locale } from '../../domain/locale';
import { I18nProvider } from '../../presentation/i18n-provider';
import { useTranslation } from '../../presentation/use-translation';

describe('I18n React integration', () => {
  const makeStorage = (locale: Locale = null) => {
    return {
      get: jest.fn((key: string) => {
        if (key === 'locale') return locale;
        return null;
      }),
      set: jest.fn(),
      remove: jest.fn(),
    };
  };

  function FakeApp() {
    const { t } = useTranslation();
    return <div>{t('login_title')}</div>;
  }

  it('should translate inside react tree', () => {
    const storage = makeStorage('pt-BR');
    const { getByText } = render(
      <I18nProvider storage={storage as any}>
        <FakeApp />
      </I18nProvider>,
    );

    expect(getByText('Entrar')).toBeInTheDocument();
  });

  it('should translate inside react tree', () => {
    const storage = makeStorage('en-US');
    const { getByText } = render(
      <I18nProvider storage={storage as any}>
        <FakeApp />
      </I18nProvider>,
    );

    expect(getByText('Sign in')).toBeInTheDocument();
  });
});
