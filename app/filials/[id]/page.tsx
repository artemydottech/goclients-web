import { RecordsSection } from '@/components/records-section';
import { FilialInfo } from '@/components/filial-info';

export default function FilialPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <FilialInfo />
        <RecordsSection />
      </div>
    </div>
  );
}
