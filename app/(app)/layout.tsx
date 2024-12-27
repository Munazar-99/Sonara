import AdminPanelLayout from '@/components/admin-panel/admin-panel-layout';
import { ThemeProvider } from '@/components/providers/theme-provider';

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminPanelLayout>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </AdminPanelLayout>
  );
}
