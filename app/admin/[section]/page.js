'use client';
import {use} from 'react';
import AppFrame from '../../../components/AppFrame';
import Workbench from '../../../components/Workbench';
export default function AdminSection({params}){const {section}=use(params);return <AppFrame><Workbench section={section}/></AppFrame>}
