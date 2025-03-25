import { handleToastNotification } from '@/components/toast/HandleToast';
import { useMutation } from '@tanstack/react-query';
import { updateUserAction } from '../server/actions/update-user.action';
import { z } from 'zod';
import { updateUserSchema } from '../utils/schema';
export function useUpdateUser() {
  return useMutation({
    mutationFn: async (data: z.infer<typeof updateUserSchema>) =>
      await updateUserAction(data),
    onSuccess: response => {
      if (!response?.success) {
        handleToastNotification('error', '', 'User update failed');
      } else {
        handleToastNotification('success', 'User updated successfully', '');
      }
    },
    onError: error => {
      console.error(`User update error: ${error}`);
      handleToastNotification(
        'error',
        'Unexpected Error',
        'Please try again later.',
      );
    },
  });
}
