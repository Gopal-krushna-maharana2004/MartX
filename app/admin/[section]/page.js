import AppFrame from '../../../components/AppFrame';
import Workbench from '../../../components/Workbench';

export const dynamicParams = false;

export function generateStaticParams() {
  return ['employees','departments','tasks','projects','attendance','responsibilities','announcements','company']
    .map(section => ({section}));
}

export default async function AdminSection({params}) {
  const {section} = await params;
  return <AppFrame><Workbench section={section}/></AppFrame>;
}
