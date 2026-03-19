import React, { useState, useMemo } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Input } from '@/Components/ui/Input';
import { Select, SelectItem } from '@/Components/ui/Select';
import { Button } from '@/Components/ui/Button';
import { Card } from '@/Components/ui/Card';
import { Badge } from '@/Components/ui/Badge';

export default function Dashboard({ villages }) {
  const [search, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter villages by search term and calculate progress
  const filteredVillages = useMemo(() => {
    return villages
      .filter(v => v.name.toLowerCase().includes(search.toLowerCase()))
      .map((v) => {
        const questions = v.questionnaire || [];
        const totalQuestions = questions.length;
        const answeredQuestions = questions.filter(q => q.answered).length;
        const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

        return {
          ...v,
          progress: Math.round(progress),
        };
      })
      .sort((a, b) => b.progress - a.progress);
  }, [villages, search]);

  const totalPages = Math.ceil(filteredVillages.length / rowsPerPage);
  const paginatedVillages = filteredVillages.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Outposts Loans Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor all your outposts loans.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <h2 className="text-sm font-medium text-muted-foreground">Total Villages</h2>
            <p className="mt-1 text-2xl font-bold">{villages.length}</p>
          </Card>
          <Card>
            <h2 className="text-sm font-medium text-muted-foreground">Total Loans</h2>
            <p className="mt-1 text-2xl font-bold">
              {villages.reduce((sum, v) => sum + (v.loans?.length || 0), 0)}
            </p>
          </Card>
          <Card>
            <h2 className="text-sm font-medium text-muted-foreground">Average Completion</h2>
            <p className="mt-1 text-2xl font-bold">
              {Math.round(
                villages.reduce((sum, v) => {
                  const q = v.questionnaire || [];
                  const answered = q.filter(q => q.answered).length;
                  return sum + (q.length > 0 ? (answered / q.length) * 100 : 0);
                }, 0) / (villages.length || 1)
              )}%
            </p>
          </Card>
        </div>

        {/* Search + Rows selector */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Input
            placeholder="Search villages..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <div className="flex items-center gap-2">
            <span>Show rows:</span>
            <Select value={rowsPerPage.toString()} onValueChange={val => {
              setRowsPerPage(Number(val));
              setCurrentPage(1);
            }}>
              {[10, 20, 30, 40, 50].map(n => (
                <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-md">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/20">
              <tr>
                <th className="px-4 py-2 text-left">Outpost Name</th>
                <th className="px-4 py-2 text-left">Branch Code</th>
                <th className="px-4 py-2 text-left">Total Loans</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedVillages.map(village => (
                <tr key={village.id}>
                  <td className="px-4 py-2">{village.name}</td>
                  <td className="px-4 py-2">{village.branch_id}</td>
                  <td className="px-4 py-2">{village.loans?.length || 0}</td>
                  <td className="px-4 py-2">
                    <div className="w-full bg-muted/20 h-4 rounded-full overflow-hidden">
                      <div
                        className="bg-green-500 h-4 rounded-full"
                        style={{ width: `${village.progress}%` }}
                      />
                    </div>
                    <Badge className="mt-1">{village.progress}%</Badge>
                  </td>
                  <td className="px-4 py-2">
                    <Button onClick={() => router.get(`/villages/${village.id}/loans`)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
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