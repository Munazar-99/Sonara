import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Settings2 } from 'lucide-react';

interface PersonalInformationCardProps {
  name: string;
  email: string;
}

export default function PersonalInformationCard({
  name,
  email,
}: PersonalInformationCardProps) {
  return (
    <Card className="hover-card dark:bg-gray-dark">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-primary" />
          <CardTitle>Personal Information</CardTitle>
        </div>
        <CardDescription>
          Your personal details and contact information (read-only)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <p id="name" className="mt-1 rounded-md p-2">
              {name}
            </p>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <p id="email" className="mt-1 rounded-md p-2">
              {email}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
