import {
  LayoutDashboardIcon,
  MessageCircleCodeIcon,
  Receipt,
  ShoppingCart,
  User,
  Wallet2Icon,
} from 'lucide-react';

export const adminRoute = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboardIcon,
  },
  {
    title: 'User Management',
    url: '/admin/users-management',
    icon: User,
  },
  {
    title: 'Trade Mangement',
    url: '#',
    icon: Receipt,
  },
  {
    title: 'Sales Management',
    url: '#',
    icon: ShoppingCart,
  },
  {
    title: 'Donation Management',
    url: '#',
    icon: Wallet2Icon,
  },
  {
    title: 'Message',
    icon: MessageCircleCodeIcon,
    url: '#',
  },
];
