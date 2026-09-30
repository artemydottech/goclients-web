'use client';
import { useState } from 'react';
import { useGetCompany } from '@/services/queries/companies';
import { DEFAULT_TIMEZONE, getCompanyToday } from '@/utils/date';
import { StepIndicator } from './step-indicator';
import { ServiceStep } from './service-step';
import { EmployeeStep } from './employee-step';
import { TimeStep } from './time-step';
import { BookingSummary } from './booking-summary';
import type {
  BookingSelection,
  BookingStep,
  BookingWizardProps,
} from './booking-wizard.types';

export const BookingWizard = ({ companyId }: BookingWizardProps) => {
  const { data: company } = useGetCompany(companyId);
  const timezone = company?.timezone || DEFAULT_TIMEZONE;
  const [step, setStep] = useState<BookingStep>('service');
  const [selection, setSelection] = useState<BookingSelection>(() => ({
    service: null,
    employee: null,
    date: getCompanyToday(timezone),
    slot: '',
  }));

  const update = (patch: Partial<BookingSelection>) =>
    setSelection((current) => ({ ...current, ...patch }));

  const renderStep = () => {
    if (step === 'time' && selection.service && selection.employee) {
      return (
        <TimeStep
          serviceId={selection.service.id}
          employeeId={selection.employee.id}
          timezone={timezone}
          date={selection.date}
          slot={selection.slot}
          onDateChange={(date) => update({ date, slot: '' })}
          onSlotChange={(slot) => update({ slot })}
          onBack={() => setStep('employee')}
        />
      );
    }
    if (step === 'employee' && selection.service) {
      return (
        <EmployeeStep
          serviceId={selection.service.id}
          selectedId={selection.employee?.id}
          onBack={() => setStep('service')}
          onSelect={(employee) => {
            update({ employee, slot: '' });
            setStep('time');
          }}
        />
      );
    }
    return (
      <ServiceStep
        companyId={companyId}
        selectedId={selection.service?.id}
        onSelect={(service) => {
          update({ service, employee: null, slot: '' });
          setStep('employee');
        }}
      />
    );
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="min-w-0 space-y-6 lg:col-span-2">
        <StepIndicator current={step} />
        {renderStep()}
      </div>
      <BookingSummary
        company={company}
        selection={selection}
        timezone={timezone}
      />
    </div>
  );
};
