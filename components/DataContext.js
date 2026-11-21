'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORE_KEY = 'martx-company-data-v1';
const SESSION_KEY = 'martx-demo-session-v1';
const month = new Date().toLocaleString('en-US', { month: 'short' });
const today = (() => { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; })();
const seed = () => ({
  identityMigration: 'gopal-biswa-v1',
  company: { name:'MartX', tagline:'People, progress, possibility.', email:'hello@martx.company', phone:'+1 (415) 555-0198', location:'San Francisco, CA', website:'martx.company', about:'A modern team building meaningful work together.' },
  departments: [
    {id:'d1',name:'Engineering',manager:'Biswa',employees:12,budget:'$480,000',color:'purple'},
    {id:'d2',name:'Product',manager:'Gopal',employees:8,budget:'$320,000',color:'blue'},
    {id:'d3',name:'Design',manager:'Sofia Patel',employees:6,budget:'$240,000',color:'pink'},
    {id:'d4',name:'Marketing',manager:'Noah Williams',employees:7,budget:'$280,000',color:'orange'},
    {id:'d5',name:'People & Culture',manager:'Emma Johnson',employees:4,budget:'$160,000',color:'green'},
  ],
  employees: [
    {id:'e1',name:'Biswa',email:'olivia@martx.company',username:'olivia',role:'Admin',department:'Engineering',title:'Engineering Lead',status:'Active',joined:'2022-03-14',location:'San Francisco',phone:'+1 415 555 0101',performance:96,avatar:'B'},
    {id:'e2',name:'Gopal',email:'gopal@martx.org',username:'gopal',role:'Employee',department:'Product',title:'Product Manager',status:'Active',joined:'2022-06-02',location:'Bhubaneswar',phone:'6370173996',performance:91,avatar:'G'},
    {id:'e3',name:'Sofia Patel',email:'sofia@martx.company',username:'sofia',role:'Employee',department:'Design',title:'Product Designer',status:'Active',joined:'2023-01-17',location:'San Francisco',phone:'+1 415 555 0103',performance:88,avatar:'SP'},
    {id:'e4',name:'Noah Williams',email:'noah@martx.company',username:'noah',role:'Employee',department:'Marketing',title:'Marketing Manager',status:'Active',joined:'2021-11-08',location:'Austin',phone:'+1 415 555 0104',performance:93,avatar:'NW'},
    {id:'e5',name:'Emma Johnson',email:'emma@martx.company',username:'emma',role:'Employee',department:'People & Culture',title:'People Partner',status:'Active',joined:'2023-04-11',location:'New York',phone:'+1 415 555 0105',performance:89,avatar:'EJ'},
    {id:'e6',name:'Liam Brooks',email:'liam@martx.company',username:'liam',role:'Employee',department:'Engineering',title:'Frontend Developer',status:'Active',joined:'2023-08-21',location:'Denver',phone:'+1 415 555 0106',performance:85,avatar:'LB'},
    {id:'e7',name:'Ava Thompson',email:'ava@martx.company',username:'ava',role:'Employee',department:'Design',title:'Visual Designer',status:'On leave',joined:'2024-01-09',location:'Seattle',phone:'+1 415 555 0107',performance:87,avatar:'AT'},
    {id:'e8',name:'Ethan Moore',email:'ethan@martx.company',username:'ethan',role:'Employee',department:'Engineering',title:'Backend Developer',status:'Active',joined:'2024-02-12',location:'San Francisco',phone:'+1 415 555 0108',performance:82,avatar:'EM'},
  ],
  tasks: [
    {id:'t1',title:'Q4 product roadmap',assignee:'Gopal',department:'Product',project:'Atlas redesign',priority:'High',status:'In progress',due:'2026-11-28'},
    {id:'t2',title:'Refresh onboarding flow',assignee:'Sofia Patel',department:'Design',project:'Atlas redesign',priority:'Medium',status:'In review',due:'2026-11-24'},
    {id:'t3',title:'Launch campaign brief',assignee:'Noah Williams',department:'Marketing',project:'Holiday campaign',priority:'High',status:'In progress',due:'2026-11-26'},
    {id:'t4',title:'Accessibility audit',assignee:'Liam Brooks',department:'Engineering',project:'Platform',priority:'Medium',status:'Completed',due:'2026-11-18'},
    {id:'t5',title:'Team pulse survey',assignee:'Emma Johnson',department:'People & Culture',project:'People first',priority:'Low',status:'To do',due:'2026-11-30'},
    {id:'t6',title:'API performance review',assignee:'Ethan Moore',department:'Engineering',project:'Platform',priority:'High',status:'Completed',due:'2026-11-16'},
    {id:'t7',title:'Design system tokens',assignee:'Sofia Patel',department:'Design',project:'Atlas redesign',priority:'Medium',status:'To do',due:'2026-12-02'},
  ],
  projects: [
    {id:'p1',name:'Atlas redesign',owner:'Gopal',department:'Product',status:'In progress',progress:68,start:'2026-08-01',due:'2026-12-15',team:8},
    {id:'p2',name:'Holiday campaign',owner:'Noah Williams',department:'Marketing',status:'In progress',progress:42,start:'2026-09-10',due:'2026-12-01',team:5},
    {id:'p3',name:'Platform',owner:'Biswa',department:'Engineering',status:'On track',progress:81,start:'2026-04-02',due:'2027-01-15',team:12},
    {id:'p4',name:'People first',owner:'Emma Johnson',department:'People & Culture',status:'Planning',progress:24,start:'2026-10-01',due:'2027-02-01',team:4},
  ],
  attendance: [
    {id:'a1',employee:'Biswa',date:today,checkIn:'08:54 AM',checkOut:'05:42 PM',status:'Present'},
    {id:'a2',employee:'Gopal',date:today,checkIn:'09:12 AM',checkOut:'05:30 PM',status:'Present'},
    {id:'a3',employee:'Sofia Patel',date:today,checkIn:'09:02 AM',checkOut:'05:51 PM',status:'Present'},
    {id:'a4',employee:'Noah Williams',date:today,checkIn:'—',checkOut:'—',status:'Remote'},
    {id:'a5',employee:'Emma Johnson',date:today,checkIn:'09:28 AM',checkOut:'05:15 PM',status:'Late'},
    {id:'a6',employee:'Liam Brooks',date:today,checkIn:'08:47 AM',checkOut:'05:32 PM',status:'Present'},
    {id:'a7',employee:'Ava Thompson',date:today,checkIn:'—',checkOut:'—',status:'On leave'},
    {id:'a8',employee:'Ethan Moore',date:today,checkIn:'09:04 AM',checkOut:'05:44 PM',status:'Present'},
  ],
  responsibilities: [
    {id:'r1',employee:'Biswa',title:'Engineering delivery',description:'Own engineering execution and code quality across the platform team.',department:'Engineering'},
    {id:'r2',employee:'Gopal',title:'Product strategy',description:'Shape the product roadmap and align teams around customer outcomes.',department:'Product'},
    {id:'r3',employee:'Sofia Patel',title:'Product experience',description:'Create thoughtful, accessible interfaces for every customer touchpoint.',department:'Design'},
    {id:'r4',employee:'Noah Williams',title:'Brand and growth',description:'Build campaigns that grow awareness and deepen customer relationships.',department:'Marketing'},
    {id:'r5',employee:'Emma Johnson',title:'People experience',description:'Support a healthy, connected and high-performing workplace.',department:'People & Culture'},
    {id:'r6',employee:'Liam Brooks',title:'Frontend platform',description:'Develop reliable, accessible web experiences for MartX products.',department:'Engineering'},
  ],
  announcements: [
    {id:'n1',title:'A note of gratitude',body:'Thank you for bringing care and curiosity to everything you do. We are grateful for this team.',author:'Emma Johnson',date:'2026-11-20',audience:'Everyone',pinned:true},
    {id:'n2',title:'November all-hands',body:'Join us on Friday at 10:00 AM PT for our monthly company update and team wins.',author:'Biswa',date:'2026-11-18',audience:'Everyone',pinned:true},
    {id:'n3',title:'New wellness benefit',body:'Your annual wellness stipend is now available in the benefits portal. Reach out to People & Culture with questions.',author:'Emma Johnson',date:'2026-11-14',audience:'Everyone',pinned:false},
  ],
  activities: [
    {id:'x1',text:'Sofia Patel completed “Accessibility audit”',when:'12 min ago',kind:'task'},
    {id:'x2',text:'New project “Holiday campaign” was created',when:'1 hour ago',kind:'project'},
    {id:'x3',text:'Emma Johnson posted a company announcement',when:'3 hours ago',kind:'announcement'},
    {id:'x4',text:'Liam Brooks joined Engineering',when:'Yesterday',kind:'employee'},
  ],
  attendanceTrend:[{day:'Mon',present:91,remote:7,leave:2},{day:'Tue',present:88,remote:9,leave:3},{day:'Wed',present:93,remote:5,leave:2},{day:'Thu',present:89,remote:8,leave:3},{day:'Fri',present:92,remote:6,leave:2},{day:'Sat',present:35,remote:2,leave:63},{day:'Sun',present:20,remote:1,leave:79}],
  performanceTrend:[{month:'Jun',score:78},{month:'Jul',score:82},{month:'Aug',score:80},{month:'Sep',score:86},{month:'Oct',score:88},{month:month,score:91}],
});

function migrateRequestedNames(data) {
  if (data.identityMigration === 'gopal-biswa-v1') return data;
  const renamed = {'Olivia Chen':'Biswa','Marcus Rivera':'Gopal'};
  const next = {...data, identityMigration:'gopal-biswa-v1'};
  next.employees = (data.employees || []).map(employee => {
    if (employee.id === 'e1') return {...employee,name:'Biswa',username:'admin',avatar:'B'};
    if (employee.id === 'e2') return {...employee,name:'Gopal',email:'gopal@martx.org',username:'gopal',location:'Bhubaneswar',phone:'6370173996',avatar:'G'};
    return employee;
  });
  for (const collection of ['departments','tasks','projects','attendance','responsibilities','announcements']) {
    next[collection] = (data[collection] || []).map(row => {
      const updated = {...row};
      for (const field of ['manager','assignee','owner','employee','author']) {
        if (renamed[updated[field]]) updated[field] = renamed[updated[field]];
      }
      return updated;
    });
  }
  next.activities = (data.activities || []).map(activity => ({
    ...activity,
    text: (activity.text || '').replaceAll('Olivia Chen','Biswa').replaceAll('Marcus Rivera','Gopal'),
  }));
  return next;
}

const DataContext = createContext(null);
export function DataProvider({children}) {
  const [data,setData] = useState(null);
  const [user,setUser] = useState(null);
  const [ready,setReady] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORE_KEY);
      const value = saved ? JSON.parse(saved) : seed();
      const migrated = migrateRequestedNames(value);
      if (!saved || migrated !== value) localStorage.setItem(STORE_KEY, JSON.stringify(migrated));
      setData(migrated);
      const session = sessionStorage.getItem(SESSION_KEY);
      if (session) {
        const current = JSON.parse(session);
        const updated = current.employeeId === 'e1' ? {...current,name:'Biswa'} : current.employeeId === 'e2' ? {...current,name:'Gopal',username:'gopal'} : current;
        if (updated !== current) sessionStorage.setItem(SESSION_KEY,JSON.stringify(updated));
        setUser(updated);
      }
    } catch { setData(seed()); }
    setReady(true);
  }, []);
  useEffect(() => {
    const sync = event => {
      if (event.key === STORE_KEY && event.newValue) {
        try { setData(JSON.parse(event.newValue)); } catch { /* Ignore malformed external storage writes. */ }
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  const update = (key, updater) => { if (user?.role === 'Employee') return; setData(current => {
    const next = {...current,[key]:typeof updater==='function'?updater(current[key]):updater};
    localStorage.setItem(STORE_KEY,JSON.stringify(next));
    return next;
  }); };
  const save = (collection, item) => { if (user?.role === 'Employee') return; update(collection, rows => {
    const exists = rows.some(x=>x.id===item.id);
    const next = exists ? rows.map(x=>x.id===item.id?item:x) : [item,...rows];
    return next;
  }); };
  const remove = (collection,id) => { if (user?.role === 'Employee') return; update(collection, rows=>rows.filter(x=>x.id!==id)); };
  const login = (username,password,role) => {
    if (role==='Admin' && username==='admin' && password==='1234') {
      const next={name:'Biswa',username:'admin',role:'Admin',employeeId:'e1'};
      sessionStorage.setItem(SESSION_KEY,JSON.stringify(next)); setUser(next); return {ok:true};
    }
    const match = data?.employees.find(e=>e.username.toLowerCase()===username.toLowerCase() && role==='Employee' && e.role==='Employee');
    if (match && password==='1234') {
      const next={name:match.name,username:match.username,role:'Employee',employeeId:match.id};
      sessionStorage.setItem(SESSION_KEY,JSON.stringify(next)); setUser(next); return {ok:true};
    }
    return {ok:false,message:role==='Admin'?'Check the admin username and password.':'Use an employee username and the demo password.'};
  };
  const logout=()=>{sessionStorage.removeItem(SESSION_KEY);setUser(null);};
  const reset=()=>{if (user?.role !== 'Admin') return;const next=seed();localStorage.setItem(STORE_KEY,JSON.stringify(next));setData(next);};
  const value=useMemo(()=>({data,user,ready,update,save,remove,login,logout,reset}),[data,user,ready]);
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
export function useMartx(){const value=useContext(DataContext);if(!value)throw new Error('useMartx must be used inside DataProvider');return value;}
