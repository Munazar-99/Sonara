import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const CallTableHeader = () => (
  <TableHeader className="bg-gray-50 dark:bg-zinc-800">
    <TableRow className="border-b border-gray-200 hover:bg-transparent dark:border-gray-700">
      <TableHead className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
        Caller ID
      </TableHead>
      <TableHead className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
        Date & Time
      </TableHead>
      <TableHead className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
        Duration
      </TableHead>
      <TableHead className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
        Cost
      </TableHead>
      <TableHead className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
        Sentiment
      </TableHead>
    </TableRow>
  </TableHeader>
);
