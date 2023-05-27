// eslint-disable-next-line import/no-extraneous-dependencies
import jwtDecode from 'jwt-decode';

// models
import TokenBundleWithExp from '@/store/models/token-bundle-with-exp';
import TokenBundle from '@/store/models/token-bundle';

export default function parseTokenBundle(tokenBundle: TokenBundle): TokenBundleWithExp {
  const { exp }: { exp: number } = jwtDecode(tokenBundle.token as string);
  const expDate = new Date(exp * 1000).toISOString();
  return {
    token: tokenBundle.token,
    refreshToken: tokenBundle.refreshToken,
    expDate,
  };
}
