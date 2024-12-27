'use client';
import Link from 'next/link';

import { useSidebar } from '@/hooks/use-sidebar';
import { useStore } from '@/hooks/use-store';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { ContentLayout } from '@/components/app/admin-panel/content-layout';

export default function DashboardPage() {
  const sidebar = useStore(useSidebar, x => x);
  if (!sidebar) return null;
  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
    </ContentLayout>
  );
}
