import {
  Tag,
  Users,
  Settings,
  Bookmark,
  LayoutGrid,
  LucideIcon,
  Calendar,
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
          href: '',
          label: 'Calender',
          icon: Calendar,
          submenus: [
            {
              href: '/availability',
              label: 'Availability',
            },
            {
              href: '/bookings',
              label: 'Bookings',
            },
          ],
        },
        {
          href: '/categories',
          label: 'Categories',
          icon: Bookmark,
        },
        {
          href: '/tags',
          label: 'Tags',
          icon: Tag,
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
          href: '/account',
          label: 'Account',
          icon: Settings,
        },
      ],
    },
  ];
}
