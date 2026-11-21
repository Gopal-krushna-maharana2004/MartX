import AppFrame from '../../../components/AppFrame';
import Workbench from '../../../components/Workbench';
import Profile from '../../../components/Profile';

export const dynamicParams = false;

export function generateStaticParams() {
  return ['tasks','attendance','responsibilities','announcements','profile']
    .map(section => ({section}));
}

export default async function EmployeeSection({params}) {
  const {section} = await params;
  return <AppFrame>{section==='profile'?<Profile/>:<Workbench section={section}/>}</AppFrame>;
}
