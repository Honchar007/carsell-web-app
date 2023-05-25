// models
import TokenBundleWithExp from './token-bundle-with-exp';

interface Session extends TokenBundleWithExp {
  refreshTimerId: number | null,
}

export default Session;
