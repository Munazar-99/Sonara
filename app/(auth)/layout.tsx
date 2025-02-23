import { SplineSceneBasic } from "@/features/auth/login/components/SplineSceneBasic";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {children}
      <div className="hidden lg:block">
        <SplineSceneBasic />
      </div>
    </div>
  );
}
