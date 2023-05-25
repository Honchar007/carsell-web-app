// models
import TokenBundle from './token-bundle';

interface TokenBundleWithExp extends TokenBundle {
  expDate: string | null,
}

export default TokenBundleWithExp;
