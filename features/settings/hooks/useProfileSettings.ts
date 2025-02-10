import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { securityFormSchema } from '../utils/schema';
import { VoiceResponse } from 'retell-sdk/resources/voice.mjs';
import { useMutation } from '@tanstack/react-query';
import changePasswordAction from '../server/actions/change-password.action';
import { handleToastNotification } from '@/components/toast/HandleToast';

type SecurityFormValues = z.infer<typeof securityFormSchema>;

export function useProfileSettings() {
  const [selectedVoice, setSelectedVoice] = useState<VoiceResponse | null>(
    null,
  );
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: SecurityFormValues) =>
      changePasswordAction(values),
    onSuccess: data => {
      if (data.error) {
        handleToastNotification(
          'error',
          'Failed to update password',
          data.error,
        );
        return;
      }
      // clear form
      securityForm.reset();
      handleToastNotification('success', 'Password updated successfully', '');
    },
    onError: err => {
      console.error(err);
      handleToastNotification(
        'error',
        'Failed to update password',
        'An error occurred while updating your password. Please try again.',
      );
    },
  });

  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSecuritySubmit = async (values: SecurityFormValues) => {
    mutate(values);
  };

  const handlePlayVoice = (event: React.MouseEvent, voiceId: string) => {
    event.stopPropagation();
    setPlayingVoiceId(prev => (prev === voiceId ? null : voiceId));
  };

  return {
    securityForm,
    onSecuritySubmit,
    selectedVoice,
    setSelectedVoice,
    playingVoiceId,
    handlePlayVoice,
    setPlayingVoiceId,
    isLoading: isPending,
  };
}
