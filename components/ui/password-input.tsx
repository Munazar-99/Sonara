'use client';

import { Button } from './button';
import { Input, InputProps } from './input';
import { cn } from '@/utils/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as React from 'react';

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const disabled =
      props.value === '' || props.value === undefined || props.disabled;

    return (
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('hide-password-toggle pr-10 text-dark', className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(prev => !prev)}
          tabIndex={-1}
          disabled={disabled}
        >
          {showPassword && !disabled ? (
            <EyeIcon
              className="h-4 w-4 text-dark dark:text-white"
              aria-hidden="true"
            />
          ) : (
            <EyeOffIcon
              className="h-4 w-4 text-dark dark:text-white"
              aria-hidden="true"
            />
          )}
          <span className="sr-only">
            {showPassword ? 'Hide password' : 'Show password'}
          </span>
        </Button>

        <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
      </div>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
