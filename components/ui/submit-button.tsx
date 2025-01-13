import React from 'react';
import { Button } from './button';
import { Loader2 } from 'lucide-react';

type Props = {
  isSubmitting: boolean;
  loadingMessage: string;
  children: React.ReactNode;
  className?: string;
};

const SubmitButton: React.FC<Props> = ({
  isSubmitting,
  loadingMessage,
  children,
  className,
}) => {
  return (
    <Button
      disabled={isSubmitting}
      className={className}
      aria-label={isSubmitting ? loadingMessage : ''}
      type="submit"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingMessage}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
