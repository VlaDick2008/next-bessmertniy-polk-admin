import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function RootLoading() {
  return (
    <section className="flex h-full w-full">
      <Sidebar />
      <div className="w-full">
        <Header label="Загрузка..." description="Загрузка..." />
      </div>
    </section>
  );
}
