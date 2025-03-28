import SetPasswordForm from '@/features/auth/set-password/components/SetPasswordForm';
import { GalleryVerticalEnd } from 'lucide-react';
import React from 'react';

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;

  return (
    <div className="flex min-h-[80vh] flex-col gap-0 bg-white p-6 md:p-10">
      <div className="flex justify-center gap-2 md:justify-start">
        <a href="#" className="flex items-center gap-2 font-medium text-dark">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-white">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full">
          <SetPasswordForm token={token} />
        </div>
      </div>
    </div>
  );
}
