import { appointments } from './appointments-list.constants';

export const AppointmentsList = () => {
  return (
    <div className="space-y-4">
      {appointments.map((appt, i) => (
        <div
          key={i}
          className="flex items-start gap-4 rounded-lg border p-4 hover:bg-accent/50 transition-colors"
        >
          <div className="min-w-[60px] text-center">
            <div className="text-lg font-bold">{appt.time}</div>
            <div className="text-xs text-muted-foreground">{appt.duration}</div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="font-medium">{appt.client}</div>
            <div className="text-sm text-muted-foreground">{appt.service}</div>
          </div>

          <div className="text-right">
            <div className="text-sm font-medium">{appt.master}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
