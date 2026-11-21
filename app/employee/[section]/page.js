'use client';
import {use} from 'react';
import AppFrame from '../../../components/AppFrame';
import Workbench from '../../../components/Workbench';
import Profile from '../../../components/Profile';
export default function EmployeeSection({params}){const {section}=use(params);return <AppFrame>{section==='profile'?<Profile/>:<Workbench section={section}/>}</AppFrame>}
