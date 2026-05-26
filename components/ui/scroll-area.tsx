import React from 'react';
import cn from '../../lib/utils';

export const ScrollArea: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  const base = 'overflow-auto';
  return (
    <div className={cn(base, className)} {...props}>
      {children}
    </div>
  );
};
