'use client';

import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { useRouter } from 'next/navigation';
import { loginAction } from '@/features/auth/login/sever/actions/login.action';
import { PasswordInput } from '@/components/ui/password-input';
import RequiredFormLabel from '@/components/ui/required-form-label';
import { signInSchema } from '../utils/zod/schema';
import { handleToastNotification } from '@/components/toast/HandleToast';
import SubmitButton from '@/components/ui/submit-button';

export function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    try {
      // Call the sign-in function
      const response = await loginAction(data);

      // Handle sign-in response
      if (response && response.error) {
        handleToastNotification('error', 'Sign-in Failed', response.error);
      } else {
        router.push('/dashboard');
        handleToastNotification('success', 'Sign-in Successful!', '');
      }
    } catch (error) {
      // Handle unexpected errors, including redirect errors
      if (isRedirectError(error)) {
        console.warn('Redirect error occurred: ', error);
      } else {
        console.error(`Sign-in error: ${error}`);

        handleToastNotification(
          'error',
          'Unexpected Error',
          'Please try again later.',
        );
      }
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Welcome Back!</h1>
          <p className="text-sm text-muted-foreground">
            Please sign in to continue
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <RequiredFormLabel>Email</RequiredFormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type="email"
                    placeholder="Enter your email"
                    aria-label="Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <RequiredFormLabel>Password</RequiredFormLabel>
                  <Link
                    prefetch={true}
                    href="/forgot-password"
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <PasswordInput
                    required
                    {...field}
                    placeholder="Enter your password"
                    aria-label="Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton
            isSubmitting={form.formState.isSubmitting}
            loadingMessage="Please wait"
          >
            Login
          </SubmitButton>
        </div>
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
