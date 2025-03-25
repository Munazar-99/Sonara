import { UserRole, UserStatus } from '@prisma/client';

export type BillingRate = 0.5 | 1 | 2 | 5; // Match the Float values used in Prisma

export interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  role: UserRole;
  minutesUsed: number;
  callsMade: number;
  createdAt: string;
  lastActive: string | null;
  apiKey?: string;
  billingRate: BillingRate;
  currentSpend: number;
}

export interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  billingRate: BillingRate;
  status?: UserStatus;
  sendInvite?: boolean;
}
