import { common } from './common';
import { dashboard } from './dashboard';
import { login } from './login';

export default {
  ...login,
  ...dashboard,
  ...common,
};
