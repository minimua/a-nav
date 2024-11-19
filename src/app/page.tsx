import NavSite from '@/components/nav-site';
import { getNavigationData } from '@/lib/notion';

// 每分钟重新验证一次数据
export const revalidate = 60;

export default async function Home() {
  try {
    const data = await getNavigationData();
    return <NavSite initialData={data} />;
  } catch (error) {
    console.error('Error loading navigation data:', error);
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">暂时无法加载数据</h1>
          <p className="text-gray-600">请稍后再试</p>
        </div>
      </div>
    );
  }
}