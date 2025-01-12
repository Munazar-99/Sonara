'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { KeyRound } from 'lucide-react';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleToastNotification } from '@/components/auth/LoginForm';
import { PasswordInput } from '@/components/ui/password-input';
import RequiredFormLabel from '@/components/ui/required-form-label';
import { useRouter } from 'next/navigation';
import { resetPassword } from '@/app/(auth)/change-password/register-pass.action';

export const passwordSchema = z
  .object({
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

const ChangePassword = ({ token }: { token: string }) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

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
      const response = await resetPassword(token, data);

      // Handle reset-password response
      if (response && response.error) {
        handleToastNotification('error', '', response.error);
      } else {
        handleToastNotification('success', 'Reset Password Sent', '');
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
      <Card className="w-full max-w-md">
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
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      ></button>
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
              <Button className="w-full" type="submit">
                Update Password
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePassword;
