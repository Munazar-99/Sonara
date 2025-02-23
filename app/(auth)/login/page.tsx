import { LoginForm } from '@/features/auth/login/components/LoginForm';
import { GalleryVerticalEnd } from 'lucide-react';

export default function LoginPage() {
  return (
      <div className="flex flex-col gap-2 p-6 md:p-10 bg-white">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium text-dark">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-white">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

  );
}