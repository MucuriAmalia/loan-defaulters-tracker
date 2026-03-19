import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TableProps {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className }: TableProps) {
  return (
    <table
      className={cn(
        'min-w-full divide-y divide-border table-auto border',
        className
      )}
    >
      {children}
    </table>
  );
}