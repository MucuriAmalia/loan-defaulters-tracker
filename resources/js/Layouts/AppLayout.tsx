import React from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/40 flex flex-col">
      
      {/* Header */}
      <header className="border-b bg-background px-6 py-4 flex justify-between">
        <h1 className="text-xl font-semibold">Loan Management</h1>
        <span className="text-sm text-muted-foreground">Admin</span>
      </header>

      {/* Page content */}
      <main className="p-6 flex-1">
        {children}
      </main>

    </div>
  );
}