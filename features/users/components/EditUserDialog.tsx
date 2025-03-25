'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';
import { User } from '../types';
import { EditUserFormValues } from '../utils/schema';
import { EditUserForm } from './EditUserForm';

interface EditUserDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditUser: (user: User, data: EditUserFormValues) => Promise<void>;
  isPending: boolean;
}

export function EditUserDialog({
  user,
  open,
  onOpenChange,
  onEditUser,
  isPending,
}: EditUserDialogProps) {
  if (!user) return null;

  const handleSubmit = async (data: EditUserFormValues) => {
    await onEditUser(user, data);
    // onOpenChange(false)
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Pencil className="h-5 w-5" />
            Edit User
          </DialogTitle>
          <DialogDescription>
            Update user information and settings.
          </DialogDescription>
        </DialogHeader>

        <EditUserForm
          user={user}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
