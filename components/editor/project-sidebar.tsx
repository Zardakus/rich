import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Tabs, TabList, Tab } from '../ui/tabs';
import cn from '../../lib/utils';

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  const [activeTab, setActiveTab] = useState<'my-projects' | 'shared'>('my-projects');

  return (
    <div
      className={cn(
        'fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-zinc-950 border-r border-zinc-800 text-white z-40 transition-transform duration-300 ease-in-out flex flex-col',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800 shrink-0">
        <h2 className="text-sm font-semibold">Projects</h2>
        <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800">
          <X className="h-4 w-4" />
          <span className="sr-only">Close Sidebar</span>
        </Button>
      </div>

      {/* Tabs */}
      <div className="p-4 shrink-0 border-b border-zinc-800">
        <Tabs>
          <TabList className="bg-zinc-900 p-1 rounded-md">
            <Tab
              className={cn(
                'flex-1 rounded-sm text-xs transition-colors',
                activeTab === 'my-projects' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50'
              )}
              onClick={() => setActiveTab('my-projects')}
            >
              My Projects
            </Tab>
            <Tab
              className={cn(
                'flex-1 rounded-sm text-xs transition-colors',
                activeTab === 'shared' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50'
              )}
              onClick={() => setActiveTab('shared')}
            >
              Shared
            </Tab>
          </TabList>
        </Tabs>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'my-projects' && (
          <div className="flex h-full flex-col items-center justify-center text-center text-zinc-500 text-sm">
            <p>No projects yet.</p>
            <p className="mt-1">Create one to get started.</p>
          </div>
        )}
        {activeTab === 'shared' && (
          <div className="flex h-full flex-col items-center justify-center text-center text-zinc-500 text-sm">
            <p>No shared projects.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800 shrink-0">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
    </div>
  );
}
