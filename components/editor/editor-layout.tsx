"use client";

import React, { useState } from 'react';
import { EditorNavbar } from './editor-navbar';
import { ProjectSidebar } from './project-sidebar';

interface EditorLayoutProps {
  children: React.ReactNode;
}

export function EditorLayout({ children }: EditorLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-zinc-950 overflow-hidden relative">
      <EditorNavbar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <ProjectSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Canvas Area */}
      <main className="flex-1 mt-14 h-[calc(100vh-3.5rem)] overflow-auto">
        {children}
      </main>
    </div>
  );
}
