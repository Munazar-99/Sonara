import AdminPanelLayout from '@/components/main/admin-panel/admin-panel-layout';

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
