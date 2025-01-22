'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { KeyRound } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordInput } from '@/components/ui/password-input';
import RequiredFormLabel from '@/components/ui/required-form-label';
import { useRouter } from 'next/navigation';
import { setPasswordAction } from '@/features/auth/set-password/server/actions/set-password';
import { handleToastNotification } from '../../../../components/toast/HandleToast';
import { passwordSchema } from '../utils/zod/schema';
import { PasswordFormValues } from '../utils/types/type';
import SubmitButton from '@/components/ui/submit-button';

const ChangePassword = ({ token }: { token: string }) => {
  const router = useRouter();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: PasswordFormValues) => {
    if (!token) {
      console.error('Param Token not found');
      return;
    }
    try {
      // Call the reset-password function
      const response = await setPasswordAction(token, data);

      // Handle reset-password response
      if (response && response.error) {
        handleToastNotification(
          'error',
          'Reset Link Expired',
          'Please Request a new Password Reset Link',
        );
      } else {
        handleToastNotification('success', 'Password Reset Successfully', '');
        router.push('/dashboard');
      }
    } catch (error) {
      // Handle unexpected errors, including redirect errors

      console.error(`Sign-in error: ${error}`);

      handleToastNotification(
        'error',
        'Unexpected Error',
        'Please try again later.',
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="mb-4 flex w-full justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <KeyRound className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl">
            Change Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <RequiredFormLabel>New Password</RequiredFormLabel>
                    <div className="relative">
                      <FormControl>
                        <PasswordInput
                          required
                          {...field}
                          placeholder="Enter your password"
                          aria-label="Password"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <RequiredFormLabel>Confirm Password</RequiredFormLabel>
                    <FormControl>
                      <PasswordInput
                        required
                        {...field}
                        placeholder="Confirm your password"
                        aria-label="Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <SubmitButton
                isSubmitting={form.formState.isSubmitting}
                loadingMessage="Setting New Password"
                className="w-full"
              >
                Set New Password
              </SubmitButton>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePassword;
