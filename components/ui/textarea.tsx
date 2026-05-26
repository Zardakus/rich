import React from 'react';
import cn from '../../lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> ;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  const base = 'min-h-[80px] w-full rounded-md border bg-transparent p-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2';
  return <textarea ref={ref} className={cn(base, className)} {...props} />;
});
Textarea.displayName = 'Textarea';


