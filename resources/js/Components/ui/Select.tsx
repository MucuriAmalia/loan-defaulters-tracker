import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SelectProps {
  children: ReactNode;
  value: string;
  onValueChange: (val: string) => void;
  className?: string;
}

export function Select({ children, value, onValueChange, className }: SelectProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger className={cn('inline-flex items-center justify-between rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring', className)}>
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon>▼</SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content className="bg-card rounded-md shadow-md mt-1">
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  );
}

export function SelectItem({ children, value }: { children: ReactNode; value: string }) {
  return (
    <SelectPrimitive.Item value={value} className="px-3 py-2 hover:bg-accent/20 cursor-pointer rounded">
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}