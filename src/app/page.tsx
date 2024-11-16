import NavSite from '@/components/nav-site';
import { getNavigationData } from '@/lib/notion';

export default async function Home() {
  const data = await getNavigationData();
  return <NavSite initialData={data} />;
}