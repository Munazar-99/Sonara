interface CallHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

function CallHeader({ heading, text, children }: CallHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="animate-in-right grid gap-1">
        <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      <div className="animate-in-right" style={{ animationDelay: '0.1s' }}>
        {children}
      </div>
    </div>
  );
}

export default CallHeader;
