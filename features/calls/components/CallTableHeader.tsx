import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const CallTableHeader = () => (
  <TableHeader className="min-w-full bg-gray-50 dark:bg-gray-dark/50">
    <TableRow className="border-b border-gray-200 hover:bg-transparent dark:border-gray-700">
      {['Caller ID', 'Date & Time', 'Duration', 'Cost', 'Sentiment'].map(
        header => (
          <TableHead
            key={header}
            className="min-w-1/5 w-1/5 whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-black dark:text-white"
          >
            {header}
          </TableHead>
        ),
      )}
    </TableRow>
  </TableHeader>
);
