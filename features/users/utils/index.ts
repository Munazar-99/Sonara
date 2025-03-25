import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { UserStatus } from '@prisma/client';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  if (dateString === '-') return 'Never';

  return new Date(dateString).toDateString();
}

export function getStatusBadgeStyles(status: UserStatus) {
  switch (status) {
    case 'active':
      return 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-0';
    case 'pending':
      return 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-0';
    case 'suspended':
      return 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border-0';
    default:
      return '';
  }
}

export function generateUserId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function timeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value);
    if (count >= 1) {
      return `${count} ${unit}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
}
