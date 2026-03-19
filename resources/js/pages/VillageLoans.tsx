import { router } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Button } from '@/Components/ui/Button';
import { Input } from '@/Components/ui/Input';
import { Select, SelectItem } from '@/Components/ui/Select';
import { Card } from '@/Components/ui/Card';
import { Badge } from '@/Components/ui/Badge';

interface CreditOfficer {
  id: number;
  name: string;
}

interface Loan {
  id: number;
  account_id: string;
  account_name: string;
  credit_officer: CreditOfficer;
  outstanding_balance: number;
  has_questionnaire: boolean;
}

interface Village {
  id: number;
  name: string;
}

interface VillageLoansProps {
  village: Village;
  loans: Loan[];
}

export default function VillageLoans({ village, loans }: VillageLoansProps) {
  const [search, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter loans by search
  const filteredLoans = useMemo(() => {
    return loans
      .filter(
        loan =>
          loan.account_id.toLowerCase().includes(search.toLowerCase()) ||
          loan.account_name.toLowerCase().includes(search.toLowerCase()) ||
          loan.credit_officer.name.toLowerCase().includes(search.toLowerCase())
      );
  }, [loans, search]);

  const totalPages = Math.ceil(filteredLoans.length / rowsPerPage);
  const paginatedLoans = filteredLoans.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Loans in {village.name}</h1>
          <p className="text-muted-foreground mt-1">
            View and manage loans for this outpost.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <h2 className="text-sm font-medium text-muted-foreground">Total Loans</h2>
            <p className="mt-1 text-2xl font-bold">{loans.length}</p>
          </Card>
          <Card>
            <h2 className="text-sm font-medium text-muted-foreground">Questionnaires Completed</h2>
            <p className="mt-1 text-2xl font-bold">
              {loans.filter(l => l.has_questionnaire).length}
            </p>
          </Card>
          <Card>
            <h2 className="text-sm font-medium text-muted-foreground">Pending Questionnaires</h2>
            <p className="mt-1 text-2xl font-bold">
              {loans.filter(l => !l.has_questionnaire).length}
            </p>
          </Card>
        </div>

        {/* Search + Rows selector */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Input
            placeholder="Search loans..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <div className="flex items-center gap-2">
            <span>Show rows:</span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={val => {
                setRowsPerPage(Number(val));
                setCurrentPage(1);
              }}
            >
              {[10, 20, 30, 40, 50].map(n => (
                <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        {/* Loans Table */}
        <div className="overflow-x-auto border rounded-md">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/20">
              <tr>
                <th className="px-4 py-2 text-left">Account ID</th>
                <th className="px-4 py-2 text-left">Account Name</th>
                <th className="px-4 py-2 text-left">Credit Officer</th>
                <th className="px-4 py-2 text-left">Outstanding Balance</th>
                <th className="px-4 py-2 text-left">Questionnaire</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedLoans.map(loan => (
                <tr key={loan.id}>
                  <td className="px-4 py-2">{loan.account_id}</td>
                  <td className="px-4 py-2">{loan.account_name}</td>
                  <td className="px-4 py-2">{loan.credit_officer.name}</td>
                  <td className="px-4 py-2">{loan.outstanding_balance}</td>
                  <td className="px-4 py-2">
                    {!loan.has_questionnaire ? (
                      <Button
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => router.get(`/loans/${loan.id}/details`)}
                      >
                        New
                      </Button>
                    ) : (
                      <Button
                        className="bg-blue-500 hover:bg-blue-600"
                        onClick={() => router.get(`/loans/${loan.id}/details`)}
                      >
                        Edit
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <Button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
            Previous
          </Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}