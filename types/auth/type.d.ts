import { Session, User } from '@prisma/client';

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

export type UserId = string;
