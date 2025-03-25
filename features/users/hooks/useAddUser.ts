import { handleToastNotification } from '@/components/toast/HandleToast';
import { useMutation } from '@tanstack/react-query';

import { z } from 'zod';
import { addUserSchema } from '../utils/schema';
import { createUserAction } from '../server/actions/create-user.action';
export function useAddUser() {
  return useMutation({
    mutationFn: async (data: z.infer<typeof addUserSchema>) =>
      await createUserAction(data),
    onSuccess: response => {
      if (!response?.success) {
        handleToastNotification('error', response.message, '');
      } else {
        handleToastNotification('success', response.message, '');
      }
    },
    onError: error => {
      console.error(`User create error: ${error}`);
      handleToastNotification(
        'error',
        'Unexpected Error',
        'Please try again later.',
      );
    },
  });
}
