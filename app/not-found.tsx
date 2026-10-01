import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StatusScreen } from '@/components/shared/status-screen';

export default function NotFound() {
  return (
    <StatusScreen
      code="404"
      title="Такой страницы нет"
      description="Возможно, ссылка устарела или в адресе опечатка."
      actions={
        <>
          <Button asChild>
            <Link href="/">На главную</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/book">Онлайн-запись</Link>
          </Button>
        </>
      }
    />
  );
}
