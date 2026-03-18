import React, { useState, useMemo } from 'react';
import { router } from '@inertiajs/react';

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
            // Sort by progress descending
            .sort((a, b) => b.progress - a.progress);
    }, [villages, search]);

    // Pagination
    const totalPages = Math.ceil(filteredVillages.length / rowsPerPage);
    const paginatedVillages = filteredVillages.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div className="p-6">
            <h1 className="mb-2 text-2xl font-bold">Outposts Loans Management</h1>
            <p className="mb-4">Manage and monitor all your outposts loans.</p>

            {/* Search bar */}
            <input
                type="text"
                placeholder="Search villages..."
                className="mb-4 w-full border px-3 py-2 rounded"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1); // reset page on search
                }}
            />

            {/* Rows per page selector */}
            <div className="mb-4 flex items-center gap-2">
                <span>Show rows:</span>
                <select
                    value={rowsPerPage}
                    onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setCurrentPage(1); // reset page
                    }}
                    className="border px-2 py-1 rounded"
                >
                    {[10, 20, 30, 40, 50].map(n => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
            </div>

            {/* Dashboard table */}
            <table className="w-full table-auto border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Outpost Name</th>
                        <th className="px-4 py-2">Branch Code</th>
                        <th className="px-4 py-2">Total Loans</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedVillages.map((village) => (
                        <tr key={village.id} className="border-t">
                            <td className="px-4 py-2">{village.name}</td>
                            <td className="px-4 py-2">{village.loans?.length || 0}</td>
                            <td className="px-4 py-2">
                                <div className="w-full bg-gray-200 h-4 rounded">
                                    <div
                                        className="bg-green-500 h-4 rounded"
                                        style={{ width: `${village.progress}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm">{village.progress}%</span>
                            </td>
                            <td className="px-4 py-2">
                                <button
                                    className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                                    onClick={() =>
                                        router.get(`/villages/${village.id}/loans`)
                                    }
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div className="mt-4 flex justify-between items-center">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}