import SetPasswordForm from '@/features/auth/set-password/components/SetPasswordForm';
import React from 'react';

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;

  return <SetPasswordForm token={token} />;
}
