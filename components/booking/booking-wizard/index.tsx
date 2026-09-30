'use client';
import { useState } from 'react';
import { useGetCompany } from '@/services/queries/companies';
import { StepIndicator } from './step-indicator';
import { ServiceStep } from './service-step';
import { EmployeeStep } from './employee-step';
import { BookingSummary } from './booking-summary';
import type {
  BookingSelection,
  BookingStep,
  BookingWizardProps,
} from './booking-wizard.types';

const EMPTY_SELECTION: BookingSelection = { service: null, employee: null };

export const BookingWizard = ({ companyId }: BookingWizardProps) => {
  const { data: company } = useGetCompany(companyId);
  const [step, setStep] = useState<BookingStep>('service');
  const [selection, setSelection] = useState(EMPTY_SELECTION);

  const renderStep = () => {
    if (step === 'employee' && selection.service) {
      return (
        <EmployeeStep
          serviceId={selection.service.id}
          selectedId={selection.employee?.id}
          onBack={() => setStep('service')}
          onSelect={(employee) =>
            setSelection((current) => ({ ...current, employee }))
          }
        />
      );
    }
    return (
      <ServiceStep
        companyId={companyId}
        selectedId={selection.service?.id}
        onSelect={(service) => {
          setSelection({ service, employee: null });
          setStep('employee');
        }}
      />
    );
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <StepIndicator current={step} />
        {renderStep()}
      </div>
      <BookingSummary company={company} selection={selection} />
    </div>
  );
};
