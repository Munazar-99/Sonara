import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import React from 'react';

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;

  return <ResetPasswordForm token={token} />;
}
