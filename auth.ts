import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';

import prisma from './lib/db/prisma';
import { PasswordResetSession, Session, User } from '@prisma/client';
import { getSessionToken } from './lib/auth/session';
import { Resend } from 'resend';
import RaycastMagicLinkEmail from './components/email/Reset';

const resend = new Resend(process.env.RESEND_API_KEY);

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  token: string,
  userId: string,
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
  await prisma.session.create({
    data: session,
  });
  return session;
}
export async function createPasswordResetSession(
  token: string,
  userId: string,
  email: string,
): Promise<PasswordResetSession> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const expiresAt = new Date(Date.now() + 1000 * 60 * 10);

  const session = await prisma.passwordResetSession.create({
    data: {
      id: sessionId,
      userId,
      email,
      expiresAt,
    },
  });

  return session;
}

export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });
  if (result === null) {
    return { session: null, user: null };
  }
  const { user, ...session } = result;
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id: sessionId } });
    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }
  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await prisma.session.delete({ where: { id: sessionId } });
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

export async function validateRequest(): Promise<SessionValidationResult> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) {
    return { session: null, user: null };
  }
  return validateSessionToken(sessionToken);
}

export const sendEmail = async (email: string, token: string) => {
  const { error } = await resend.emails.send({
    from: 'support@munazar-ali.dev',
    to: [email],
    subject: 'Reset Password',
    react: RaycastMagicLinkEmail({
      magicLink: `http://localhost:3000/change-password/${token}`,
    }),
  });

  if (error) {
    console.error({ error });
    return {
      success: false,
      message: `Failed to send email: ${error.message}`,
    };
  }

  return {
    success: true,
    message: `An email has been sent to ${email}.`,
  };
};

export async function invalidateUserPasswordResetSessions(
  userId: string,
): Promise<void> {
  await prisma.passwordResetSession.deleteMany({
    where: {
      userId: userId,
    },
  });
}
