import React from 'react';
import cn from '../../lib/utils';

export const Tabs: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  const base = 'flex flex-col';
  return (
    <div className={cn(base, className)} {...props}>
      {children}
    </div>
  );
};

export const TabList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={cn('flex space-x-2', className)} {...props}>
    {children}
  </div>
);

export const Tab: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => (
  <button className={cn('px-3 py-1 text-sm', className)} {...props}>
    {children}
  </button>
);
