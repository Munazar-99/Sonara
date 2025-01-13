'use client';

import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, Mail } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleToastNotification } from '@/components/toast/HandleToast';
import { requestResetAction } from '../server/actions/request-reset.action';
import { emailSchema } from '../utils/zod/schema';
import { EmailFormValues } from '../utils/types/type';
import SubmitButton from '@/components/ui/submit-button';
import RequiredFormLabel from '@/components/ui/required-form-label';

const RequestReset = () => {
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: EmailFormValues) => {
    try {
      // Call the reset-password function
      const response = await requestResetAction(data);

      // Handle reset-password response
      if (response && response.error) {
        handleToastNotification('error', '', response.error);
      } else {
        handleToastNotification('success', 'Reset Password Sent', '');
      }
    } catch (error) {
      // Handle unexpected errors, including redirect errors

      console.error(`Password reset request error: ${error}`);

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
              {form.formState.isSubmitting ? (
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              ) : (
                <Mail className="h-6 w-6 text-primary" />
              )}
            </div>
          </div>
          <CardTitle className="text-center text-2xl">Reset Password</CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we&#39;ll send you a link to reset your
            password
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <RequiredFormLabel>Email</RequiredFormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <SubmitButton
                className="w-full"
                isSubmitting={form.formState.isSubmitting}
                loadingMessage="Sending Reset Link"
              >
                Send Reset Link
              </SubmitButton>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default RequestReset;
