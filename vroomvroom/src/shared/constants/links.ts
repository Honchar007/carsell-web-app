// helpers
import svgIconUrl from '../helpers/svg-icon-url';

// models
import LinkData from '../models/link-data';

const Links: LinkData[] = [
  {
    icon: svgIconUrl('home'),
    name: 'Головна',
    path: { name: 'home' },
  },
  {
    icon: svgIconUrl('tips'),
    name: 'Новини',
    path: { name: 'news' },
  },
  {
    icon: svgIconUrl('heart-green'),
    name: 'Про нас',
    path: { name: 'aboutus' },
  },
  {
    icon: svgIconUrl('gear'),
    name: 'Експерти',
    path: { name: 'experts' },
  },
];

const LinkAuth: LinkData = {
  icon: svgIconUrl('profile'),
  name: 'Мій кабінет',
  path: { name: 'profile' },
};

const LinkNotAuth: LinkData = {
  icon: svgIconUrl('logout'),
  name: 'Вхід',
  path: { name: 'signin' },
};

const OtherLinks: LinkData[] = [
  {
    icon: svgIconUrl('letter'),
    name: 'Invite a creator',
    path: { name: 'invitation' },
  },
  {
    icon: svgIconUrl('swap'),
    name: 'Apply for a creator profile',
    path: { name: 'upgrade-to-creator' },
  },
  {
    icon: svgIconUrl('profile'),
    name: 'Subscribers',
    path: { name: 'subscribers' },
  },
  {
    icon: svgIconUrl('help'),
    name: 'Help & support',
    href: 'http://google.com',
  },
];

export { OtherLinks };
export { LinkAuth, LinkNotAuth };
export default Links;
