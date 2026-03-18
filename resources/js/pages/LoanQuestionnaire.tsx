import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

// Define all questions
const questions = [
  {
    id: 1,
    title: 'Business Performance',
    type: 'line_of_business',
    options: [
      'Agri business',
      'Building and construction',
      'Trade - Buying and Selling',
      'Financial services',
      'Mining and Quarry',
      'Trade – Manufacturing',
      'Hotels And Catering',
      'Transport',
      'Service industry',
      'Other',
    ],
  },
  {
    id: 2,
    title: 'Business Status',
    type: 'single_choice',
    options: ['Ongoing', 'Closed'],
  },
  {
    id: 3,
    title: 'Loan Collaterals',
    type: 'collaterals',
  },
  {
    id: 4,
    title: 'Collection Efforts',
    type: 'collection',
  },
  {
    id: 5,
    title: "Manager's Comments",
    type: 'text',
  },
  {
    id: 6,
    title: "Operations Manager Comment",
    type: 'text',
  },
  {
    id: 7,
    title: "COO Operations Comment",
    type: 'text',
  },
];

interface LoanQuestionnaireProps {
  loan: any;
  responses: any; // preloaded responses from backend
}

export default function LoanQuestionnaire({ loan, responses }: LoanQuestionnaireProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<any>(responses || {});

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleChange = (key: string, value: any) => {
    setAnswers((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    Object.entries(answers).forEach(([key, value]) => {
      formData.append(key, value);
    });

      router.post(`/loans/${loan.id}/questionnaire`, formData);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Loan Questionnaire: {loan.account_name}</h2>

      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h3 className="font-semibold mb-2">{currentQuestion.title}</h3>

        {/* Line of Business */}
        {currentQuestion.type === 'line_of_business' &&
  currentQuestion.options.map((opt) => (
    <div key={opt} className="mb-2">
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="line_of_business"
          checked={answers[currentQuestion.id] === opt}
          onChange={() => handleChange(currentQuestion.id, opt)}
        />
        {opt}
      </label>

      {answers[currentQuestion.id] === opt && (
        <textarea
          placeholder="Add more information"
          className="w-full p-2 border rounded mt-1"
          value={answers[`${currentQuestion.id}_${opt}`] || ''}
          onChange={(e) =>
            handleChange(`${currentQuestion.id}_${opt}`, e.target.value)
          }
        />
      )}
    </div>
  ))}

        {/* Single Choice */}
        {currentQuestion.type === 'single_choice' &&
          currentQuestion.options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                name={`question_${currentQuestion.id}`}
                checked={answers[currentQuestion.id] === opt}
                onChange={() => handleChange(currentQuestion.id, opt)}
              />
              {opt}
            </label>
          ))}

        {/* Text Area */}
        {currentQuestion.type === 'text' && (
          <textarea
            className="w-full p-2 border rounded"
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
          />
        )}

        {/* Collaterals */}
        {currentQuestion.type === 'collaterals' && (
          <div>
            <label className="block mb-1 font-medium">Security Pledged</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              value={answers['collateral_item'] || ''}
              onChange={(e) => handleChange('collateral_item', e.target.value)}
            />
            <label className="block mb-1 font-medium">Security Status</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={answers['collateral_status'] || ''}
              onChange={(e) => handleChange('collateral_status', e.target.value)}
            />
          </div>
        )}

        {/* Collection Efforts */}
        {currentQuestion.type === 'collection' && (
          <div className="space-y-4">
            {/* Last Contact */}
            <label className="block mb-1 font-medium">Last Contact with Client</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={answers['last_contact_date'] || ''}
              onChange={(e) => handleChange('last_contact_date', e.target.value)}
            />

            {/* Client Visited */}
            <label className="block mb-1 font-medium">Client Visited Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={answers['client_visited_date'] || ''}
              onChange={(e) => handleChange('client_visited_date', e.target.value)}
            />

            {/* Agreement Made */}
            <label className="block mb-1 font-medium">Any Agreement Made?</label>
            <select
              className="w-full p-2 border rounded mb-1"
              value={answers['agreement_made'] || ''}
              onChange={(e) => handleChange('agreement_made', e.target.value)}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {answers['agreement_made'] === 'Yes' && (
              <>
                <label className="block mb-1 font-medium">Agreement Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded mb-1"
                  value={answers['agreement_date'] || ''}
                  onChange={(e) => handleChange('agreement_date', e.target.value)}
                />
                <label className="block mb-1 font-medium">Agreement Description</label>
                <textarea
                  className="w-full p-2 border rounded"
                  value={answers['agreement_description'] || ''}
                  onChange={(e) => handleChange('agreement_description', e.target.value)}
                />
              </>
            )}

            {/* Demand Letter */}
            <label className="block mb-1 font-medium">Demand Letter Issued?</label>
            <select
              className="w-full p-2 border rounded mb-1"
              value={answers['demand_letter_issued'] || ''}
              onChange={(e) => handleChange('demand_letter_issued', e.target.value)}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {answers['demand_letter_issued'] === 'Yes' && (
              <>
                <label className="block mb-1 font-medium">Date Issued</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded mb-1"
                  value={answers['demand_letter_date'] || ''}
                  onChange={(e) => handleChange('demand_letter_date', e.target.value)}
                />
                {answers['demand_letter_file'] && typeof answers['demand_letter_file'] === 'string' && (
                  <div className="mb-2">
                    <a
                      href={`/storage/${answers['demand_letter_file']}`}
                      target="_blank"
                      className="text-blue-500 underline"
                    >
                      View Existing Demand Letter
                    </a>
                  </div>
                )}
                <label className="block mb-1 font-medium">Attach Document</label>
                <input
                  type="file"
                  className="w-full mb-2"
                  onChange={(e) => handleChange('demand_letter_file', e.target.files[0])}
                />
              </>
            )}

            {/* Client Reprocessed */}
            <label className="block mb-1 font-medium">Is Client Reprocessed?</label>
            <select
              className="w-full p-2 border rounded mb-1"
              value={answers['client_reprocessed'] || ''}
              onChange={(e) => handleChange('client_reprocessed', e.target.value)}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {answers['client_reprocessed'] === 'Yes' && (
              <>
                <label className="block mb-1 font-medium">Reprocessed Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={answers['reprocessed_date'] || ''}
                  onChange={(e) => handleChange('reprocessed_date', e.target.value)}
                />
              </>
            )}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}