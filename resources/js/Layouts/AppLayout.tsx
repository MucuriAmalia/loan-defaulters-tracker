import React from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/40 flex flex-col">
      
      {/* Header */}
      <header
        className="border-b px-6 py-4 flex justify-between"
        style={{ backgroundColor: 'oklch(35.41% 0.1196 264.11)' }}
      >
        <h1 className="text-xl font-semibold text-white">Loan Defaulters Management</h1>
        <span className="text-sm text-white">Admin</span>
      </header>

      {/* Page content */}
      <main className="p-6 flex-1">
        {children}
      </main>

    </div>
  );
}