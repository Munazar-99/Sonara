interface CallHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export default function CallHeader({
  heading,
  text,
  children,
}: CallHeaderProps) {
  return (
    <div className="flex flex-col gap-4 px-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="animate-in-right grid gap-1">
        <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          {heading}
        </h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      <div className="animate-in-right" style={{ animationDelay: '0.1s' }}>
        {children}
      </div>
    </div>
  );
}
