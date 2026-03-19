import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import { Button } from '@/Components/ui/Button';
import { Card } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';
import { Select, SelectItem } from '@/Components/ui/Select';
import AppLayout from '@/Layouts/AppLayout';
import { Textarea } from '@/Components/ui/Textarea';


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
  { id: 2, title: 'Business Status', type: 'single_choice', options: ['Ongoing', 'Closed'] },
  { id: 3, title: 'Loan Collaterals', type: 'collaterals' },
  { id: 4, title: 'Collection Efforts', type: 'collection' },
  { id: 5, title: "Manager's Comments", type: 'text' },
  { id: 6, title: "Operations Manager Comment", type: 'text' },
  { id: 7, title: "COO Operations Comment", type: 'text' },
];

interface LoanQuestionnaireProps {
  loan: any;
  responses: any; // preloaded responses
}

export default function LoanQuestionnaire({ loan, responses }: LoanQuestionnaireProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<any>(responses || {});

  const currentQuestion = questions[currentIndex];

  const handleChange = (key: string, value: any) => {
    setAnswers((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    Object.entries(answers).forEach(([key, value]) => {
      formData.append(key, value);
    });
    router.post(`/loans/${loan.id}/questionnaire`, formData);
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto mt-8 space-y-6">
        <h2 className="text-2xl font-bold">Loan Questionnaire: {loan.account_name}</h2>

        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-lg">{currentQuestion.title}</h3>

          {/* Line of Business */}
          {currentQuestion.type === 'line_of_business' &&
            currentQuestion.options.map(opt => (
              <div key={opt} className="space-y-1">
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
                  <Textarea
                    placeholder="Add more information"
                    value={answers[`${currentQuestion.id}_${opt}`] || ''}
                    onChange={e => handleChange(`${currentQuestion.id}_${opt}`, e.target.value)}
                  />
                )}
              </div>
            ))}

          {/* Single Choice */}
          {currentQuestion.type === 'single_choice' &&
            currentQuestion.options.map(opt => (
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

          {/* Text */}
          {currentQuestion.type === 'text' && (
            <Textarea
              value={answers[currentQuestion.id] || ''}
              onChange={e => handleChange(currentQuestion.id, e.target.value)}
            />
          )}

          {/* Collaterals */}
          {currentQuestion.type === 'collaterals' && (
            <div className="space-y-2">
              <Input
                label="Security Pledged"
                value={answers['collateral_item'] || ''}
                onChange={e => handleChange('collateral_item', e.target.value)}
              />
              <Input
                label="Security Status"
                value={answers['collateral_status'] || ''}
                onChange={e => handleChange('collateral_status', e.target.value)}
              />
            </div>
          )}

          {/* Collection */}
          {currentQuestion.type === 'collection' && (
            <div className="space-y-2">
              <Input
                label="Last Contact with Client"
                type="date"
                value={answers['last_contact_date'] || ''}
                onChange={e => handleChange('last_contact_date', e.target.value)}
              />
              <Input
                label="Client Visited Date"
                type="date"
                value={answers['client_visited_date'] || ''}
                onChange={e => handleChange('client_visited_date', e.target.value)}
              />
              <Select
                label="Any Agreement Made?"
                value={answers['agreement_made'] || ''}
                onValueChange={val => handleChange('agreement_made', val)}
              >
                <SelectItem value="">Select</SelectItem>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </Select>
              {answers['agreement_made'] === 'Yes' && (
                <>
                  <Input
                    label="Agreement Date"
                    type="date"
                    value={answers['agreement_date'] || ''}
                    onChange={e => handleChange('agreement_date', e.target.value)}
                  />
                  <Textarea
                    label="Agreement Description"
                    value={answers['agreement_description'] || ''}
                    onChange={e => handleChange('agreement_description', e.target.value)}
                  />
                </>
              )}
              <Select
                label="Demand Letter Issued?"
                value={answers['demand_letter_issued'] || ''}
                onValueChange={val => handleChange('demand_letter_issued', val)}
              >
                <SelectItem value="">Select</SelectItem>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </Select>
              {answers['demand_letter_issued'] === 'Yes' && (
                <>
                  <Input
                    label="Date Issued"
                    type="date"
                    value={answers['demand_letter_date'] || ''}
                    onChange={e => handleChange('demand_letter_date', e.target.value)}
                  />
                  <Input
                    label="Attach Document"
                    type="file"
                    onChange={e => handleChange('demand_letter_file', e.target.files[0])}
                  />
                  {answers['demand_letter_file'] &&
                    typeof answers['demand_letter_file'] === 'string' && (
                      <a
                        href={`/storage/${answers['demand_letter_file']}`}
                        target="_blank"
                        className="text-blue-500 underline"
                      >
                        View Existing Demand Letter
                      </a>
                    )}
                </>
              )}
              <Select
                label="Is Client Reprocessed?"
                value={answers['client_reprocessed'] || ''}
                onValueChange={val => handleChange('client_reprocessed', val)}
              >
                <SelectItem value="">Select</SelectItem>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </Select>
              {answers['client_reprocessed'] === 'Yes' && (
                <Input
                  label="Reprocessed Date"
                  type="date"
                  value={answers['reprocessed_date'] || ''}
                  onChange={e => handleChange('reprocessed_date', e.target.value)}
                />
              )}
            </div>
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between space-x-2">
          <Button
            variant="secondary"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>
          {currentIndex < questions.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button className="bg-green-500 hover:bg-green-600" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </AppLayout>
  );
}