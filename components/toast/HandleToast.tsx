import { CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export const handleToastNotification = (
  type: 'success' | 'error',
  message: string,
  description: string,
): void => {
  const config = {
    success: {
      className: '!bg-green-50 !border-green-200 !text-green-900',
      icon: <CheckCircle className="h-5 w-5 !text-green-600" />,
    },
    error: {
      className: '!bg-red-50 !border-red-200 !text-red-900',
      icon: <XCircle className="h-5 w-5 !text-red-600" />,
    },
  };

  toast(message, {
    position: 'top-center',
    ...config[type],
    description,
  });
};
