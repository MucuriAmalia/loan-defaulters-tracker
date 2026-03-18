import React from 'react';
import { router } from '@inertiajs/react';
import route from 'ziggy-js';
export default function Dashboard({ villages }) {
    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
            <table className="w-full table-auto border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Village</th>
                        <th className="px-4 py-2">Total Loans</th>
                        <th className="px-4 py-2">Progress</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {villages.map((village) => (
                        <tr key={village.id} className="border-t">
                            <td className="px-4 py-2">{village.name}</td>
                            <td className="px-4 py-2">
                                {village.loans.length}
                            </td>
                            <td className="px-4 py-2">
                                {/* Progress calculation later */} 50%
                            </td>
                            <td className="px-4 py-2">
                                <button
                                    className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                                    onClick={() =>
                                        router.get(
                                            `/villages/${village.id}/loans`,
                                        )
                                    }
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
