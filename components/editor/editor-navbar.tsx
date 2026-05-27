import React from 'react';
import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import { Button } from '../ui/button';

interface EditorNavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function EditorNavbar({ isSidebarOpen, toggleSidebar }: EditorNavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4 z-50 text-white">
      {/* Left Section */}
      <div className="flex items-center space-x-4 w-1/3">
        <Button variant="ghost" onClick={toggleSidebar} className="h-9 w-9 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800">
          {isSidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>

      {/* Center Section */}
      <div className="flex items-center justify-center w-1/3">
        {/* Empty for now */}
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-end w-1/3">
        {/* Empty for now */}
      </div>
    </header>
  );
}
