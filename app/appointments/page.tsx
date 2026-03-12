import React from 'react';

interface Props {
  className?: string;
}

const AppointmentsPage: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <h2>This is appoinments</h2>
    </div>
  );
};

export default AppointmentsPage;
