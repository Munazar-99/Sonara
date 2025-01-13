import {
  Users,
  Settings,
  LayoutGrid,
  LucideIcon,
  Calendar,
  PhoneCall,
  Clock,
} from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Contents',
      menus: [
        {
          href: '/availability',
          label: 'Availability',
          icon: Clock,
        },
        {
          href: '/bookings',
          label: 'Bookings',
          icon: Calendar,
        },
        {
          href: '/calls',
          label: 'Call Logs',
          icon: PhoneCall,
        },
      ],
    },
    {
      groupLabel: 'Settings',
      menus: [
        {
          href: '/users',
          label: 'Users',
          icon: Users,
        },
        {
          href: '/settings',
          label: 'Account',
          icon: Settings,
        },
      ],
    },
  ];
}
