import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Loader2, Shield } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { securityFormSchema } from '../utils/schema';
import { PasswordInput } from '@/components/ui/password-input';
import RequiredFormLabel from '@/components/ui/required-form-label';

type SecurityFormValues = z.infer<typeof securityFormSchema>;

interface SecurityCardProps {
  form: UseFormReturn<SecurityFormValues>;
  onSubmit: (values: SecurityFormValues) => Promise<void>;
  isLoading: boolean;
}

export default function SecurityCard({
  form,
  onSubmit,
  isLoading,
}: SecurityCardProps) {
  return (
    <Card className="hover-card dark:bg-gray-dark">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>Security</CardTitle>
        </div>
        <CardDescription>
          Manage your password and security preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            aria-label="Security Settings Form"
          >
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <RequiredFormLabel className="text-dark dark:text-white">
                    Current Password
                  </RequiredFormLabel>
                  <FormControl>
                    <div className="relative">
                      <PasswordInput
                        {...field}
                        className="rounded-sm border border-stroke bg-[#f8f8f8] pr-10 dark:border-none dark:bg-[#2C303B]/80 dark:text-white dark:focus:shadow-none"
                        required
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="!text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <RequiredFormLabel className="!text-dark dark:!text-white">
                    New Password
                  </RequiredFormLabel>
                  <FormControl>
                    <div className="relative">
                      <PasswordInput
                        {...field}
                        className="rounded-sm border border-stroke bg-[#f8f8f8] pr-10 dark:border-none dark:bg-[#2C303B]/80 dark:text-white dark:focus:shadow-none"
                        required
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="!text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <RequiredFormLabel className="!text-dark dark:!text-white">
                    Confirm New Password
                  </RequiredFormLabel>
                  <FormControl>
                    <div className="relative">
                      <PasswordInput
                        {...field}
                        className="rounded-sm border border-stroke bg-[#f8f8f8] pr-10 dark:border-none dark:bg-[#2C303B]/80 dark:text-white dark:focus:shadow-none"
                        required
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="!text-red-500" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Password'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
