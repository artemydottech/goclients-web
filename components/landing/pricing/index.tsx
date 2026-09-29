import { LuCheck } from 'react-icons/lu';
import { Section } from '@/components/landing/section';
import { COMPARISON, REQUIREMENTS } from './pricing.constants';

export const Pricing = () => (
  <Section
    id="pricing"
    eyebrow="Стоимость"
    title="Бесплатно, потому что сервер ваш"
    description="goclients — открытый проект. Платите хостингу, а не за каждого мастера."
  >
    <div className="grid gap-6 lg:grid-cols-5">
      <ul className="space-y-3 sm:hidden">
        {COMPARISON.map((row) => (
          <li key={row.label} className="rounded-xl border p-4 text-sm">
            <p className="mb-2 font-medium">{row.label}</p>
            <p className="text-muted-foreground">Облако: {row.cloud}</p>
            <p>goclients: {row.selfhosted}</p>
          </li>
        ))}
      </ul>
      <div className="hidden overflow-hidden rounded-xl border sm:block lg:col-span-3">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left">
            <tr>
              <th className="p-4 font-medium" />
              <th className="p-4 font-medium text-muted-foreground">
                Облачные сервисы
              </th>
              <th className="p-4 font-medium">goclients</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {COMPARISON.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="p-4 text-left font-medium">
                  {row.label}
                </th>
                <td className="p-4 text-muted-foreground">{row.cloud}</td>
                <td className="p-4">{row.selfhosted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-4 rounded-xl border bg-primary p-6 text-primary-foreground lg:col-span-2">
        <p className="text-sm opacity-80">Selfhosted</p>
        <p className="text-5xl font-bold tracking-tight">0 ₽</p>
        <p className="text-sm opacity-80">
          Без ограничений по мастерам, филиалам и записям
        </p>
        <ul className="mt-2 space-y-2 text-sm">
          {REQUIREMENTS.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <LuCheck className="mt-0.5 size-4 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Section>
);
