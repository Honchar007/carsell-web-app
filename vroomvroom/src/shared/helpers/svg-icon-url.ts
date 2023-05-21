export default function svgIconUrl(iconName: string): string {
  const images = require.context('@/assets/icons/', false, /\.svg$/);
  return images(`./${iconName}.svg`);
}
