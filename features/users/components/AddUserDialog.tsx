'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UserPlus } from 'lucide-react';
import { AddUserFormValues } from '../utils/schema';
import { AddUserForm } from './AddUserForm';

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUser: (data: AddUserFormValues) => void;
  isPending: boolean;
}

export function AddUserDialog({
  open,
  onOpenChange,
  onAddUser,
  isPending,
}: AddUserDialogProps) {
  const handleSubmit = (data: AddUserFormValues) => {
    onAddUser(data);
    // onOpenChange(false)
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <UserPlus className="h-5 w-5" />
            Add User
          </DialogTitle>
          <DialogDescription>
            Add a new user to your organization.
          </DialogDescription>
        </DialogHeader>

        <AddUserForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
