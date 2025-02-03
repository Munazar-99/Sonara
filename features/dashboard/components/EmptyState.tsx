import type { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function EmptyState({ icon: Icon, title, description, className = "" }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center w-full text-center p-6 ${className}`}>
      <div className="rounded-full bg-muted p-4 mb-4 ring-1 ring-muted/20">
        <Icon className="w-6 h-6 text-muted-foreground" />
      </div>
      <h3 className="text-base font-medium text-muted-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground/70 max-w-[160px]">{description}</p>
    </div>
  )
}

