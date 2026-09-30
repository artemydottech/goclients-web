'use client';
import { useState } from 'react';
import { useGetCompany } from '@/services/queries/companies';
import { useCreateBooking } from '@/services/mutations/booking';
import { BookingContactsForm } from '@/forms/booking-contacts-form';
import { DEFAULT_TIMEZONE, getCompanyToday } from '@/utils/date';
import { StepIndicator } from './step-indicator';
import { ServiceStep } from './service-step';
import { EmployeeStep } from './employee-step';
import { TimeStep } from './time-step';
import { BookingSummary } from './booking-summary';
import { BookingConfirmation } from './booking-confirmation';
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
  const [isBooked, setIsBooked] = useState(false);

  const createBooking = useCreateBooking();

  const update = (patch: Partial<BookingSelection>) =>
    setSelection((current) => ({ ...current, ...patch }));

  const renderStep = () => {
    if (step === 'contacts' && selection.service && selection.employee) {
      const { service, employee, slot } = selection;
      return (
        <BookingContactsForm
          isPending={createBooking.isPending}
          errorMessage={createBooking.error?.message}
          onBack={() => setStep('time')}
          onSubmit={(contacts) =>
            createBooking.mutate(
              {
                ...contacts,
                companyId,
                serviceId: service.id,
                employeeId: employee.id,
                startsAt: slot,
              },
              { onSuccess: () => setIsBooked(true) },
            )
          }
        />
      );
    }
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
          onNext={() => setStep('contacts')}
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

  if (isBooked) {
    return (
      <BookingConfirmation
        company={company}
        selection={selection}
        timezone={timezone}
        onRestart={() => {
          createBooking.reset();
          setSelection((current) => ({
            ...current,
            service: null,
            employee: null,
            slot: '',
          }));
          setStep('service');
          setIsBooked(false);
        }}
      />
    );
  }

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
