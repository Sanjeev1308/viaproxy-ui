import {
  BookAIcon,
  HelpCircle,
  LayoutDashboardIcon,
  MessageCircleCodeIcon,
  Settings2,
  ShoppingCart,
  Wallet2Icon,
} from 'lucide-react';

export const ecoCitizenRoute = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboardIcon,
  },
  {
    title: 'How it works',
    url: '#',
    icon: BookAIcon,
  },
  {
    title: 'My Campus Club',
    url: '#',
    icon: MessageCircleCodeIcon,
    isActive: true,
    items: [
      {
        title: 'Messaging',
        url: '/messaging',
      },
      {
        title: 'Campus Blog',
        url: '/campus-blog',
      },
    ],
  },
  {
    title: 'Exchange',
    url: '#',
    icon: Settings2,
    items: [
      {
        title: 'Find an exchange offer',
        url: '/exchange/find-exchange-offer',
      },
      {
        title: 'Submit an exchange offer',
        url: '#',
      },
      {
        title: 'My exchange offers',
        url: '#',
      },
      {
        title: 'Ongoing exchanges',
        url: '#',
      },
      {
        title: 'Exchanges carried out',
        url: '#',
      },
      {
        title: 'Proposals received',
        url: '#',
      },
    ],
  },
  {
    title: 'Donation',
    url: '#',
    icon: Wallet2Icon,
    items: [
      {
        title: 'Find a donation offer',
        url: '#',
      },
      {
        title: 'Submit a donation offer',
        url: '#',
      },
      {
        title: 'My Donation Offers',
        url: '#',
      },
      {
        title: 'Ongoing Donations',
        url: '#',
      },
      {
        title: 'Donations made',
        url: '#',
      },
      {
        title: 'Donations received',
        url: '#',
      },
    ],
  },
  {
    title: 'CampusMarket (Sale)',
    icon: ShoppingCart,
    url: '#',
    items: [
      { title: 'Find a good deal', url: '#' },
      { title: 'Submit an offer to sell', url: '#' },
      { title: 'My sales offers', url: '#' },
      { title: 'My sales transactions', url: '#' },
      { title: 'Current sales', url: '#' },
      { title: 'Sales made', url: '#' },
      { title: 'Proposals received', url: '#' },
    ],
  },
  {
    title: 'Help & Support',
    icon: HelpCircle,
    url: '#',
    items: [
      { title: 'Legal mediation', url: '#' },
      { title: 'Alert Management', url: '#' },
    ],
  },
];
