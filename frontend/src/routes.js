import React from 'react';

const User = React.lazy(() => import('./views/User/UserManagement'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
//Category Routes
const Category = React.lazy(() => import('./views/Category/CategoryManagment'))

//Challenge Routes
const Challenge = React.lazy(() => import('./views/Challenge/ChallengeManagement'))
const ChallengeAdd = React.lazy(() => import('./views/Challenge/ChallengeAdd'))
const ChallengeView = React.lazy(() => import('./views/Challenge/ChallengeView'))

//CMs
const Cms = React.lazy(() => import("./views/Cms/Cms"));
const Cmsform = React.lazy(() => import('./views/cmsform/Cmsform'));
const Cmsgetform = React.lazy(() => import('./views/cmsform/Cmsgetform'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/user', name: 'User Management', component: User },
  { path: '/category', name: 'Category Management', component: Category },
  { path: '/challenge', name: 'Challenge Management', component: Challenge },
  { path: '/addChallenge', name: 'Challenge Management', component: ChallengeAdd },
  { path: '/viewChallenge', name: 'Challenge Management', component: ChallengeAdd },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/cms', exact: true, name: "cms", component: Cms },
  { path: '/cms/cmsform/:id', exact: true, name: "cms", component: Cmsform },
  { path: '/cms/cmsgetform/:id', exact: true, name: "cms", component: Cmsgetform }
];

export default routes;
