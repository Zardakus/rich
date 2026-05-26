import React from 'react';
import cn from '../../lib/utils';

export type DialogProps = React.HTMLAttributes<HTMLDivElement> ;

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(({ className, children, ...props }, ref) => {
  const base = 'fixed inset-0 z-50 flex items-center justify-center';
  return (
    <div ref={ref} className={cn(base, className)} {...props}>
      {children}
    </div>
  );
});
Dialog.displayName = 'Dialog';


