import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const CallTableHeader = () => (
  <TableHeader className="bg-gray-50 dark:bg-zinc-800">
    <TableRow className="border-b border-gray-200 hover:bg-transparent dark:border-gray-700">
      {['Caller ID', 'Date & Time', 'Duration', 'Cost', 'Sentiment'].map(
        header => (
          <TableHead
            key={header}
            className="w-[200px] min-w-[200px] whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-muted-foreground"
          >
            {header}
          </TableHead>
        ),
      )}
    </TableRow>
  </TableHeader>
);
