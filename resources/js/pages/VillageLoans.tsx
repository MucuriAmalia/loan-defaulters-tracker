import { router } from '@inertiajs/react';
import React from 'react';

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
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Loans in {village.name}</h1>

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Account ID</th>
            <th className="px-4 py-2">Account Name</th>
            <th className="px-4 py-2">Credit Officer</th>
            <th className="px-4 py-2">Outstanding Balance</th>
            <th className="px-4 py-2">Questionnaire</th>
          </tr>
        </thead>
    <tbody>
      {loans.map((loan) => (
        <tr key={loan.id} className="border-t">
          <td className="px-4 py-2">{loan.account_id}</td>
          <td className="px-4 py-2">{loan.account_name}</td>
          <td className="px-4 py-2">{loan.credit_officer.name}</td>
          <td className="px-4 py-2">{loan.outstanding_balance}</td>

          <td className="px-4 py-2">
            {!loan.has_questionnaire ? (
              <button
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => router.get(`/loans/${loan.id}/details`)}
              >
                New
              </button>
            ) : (
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => router.get(`/loans/${loan.id}/details`)}
              >
                Edit
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
      </table>
    </div>
  );
}