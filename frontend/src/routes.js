import React from 'react';

const User = React.lazy(() => import('./views/User/UserManagement'));
const Category = React.lazy(()=>import('./views/Category/CategoryManagment'))
const Challenge = React.lazy(()=> import('./views/ChallengeManagement/ChallengeManagement'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/user', name: 'User Management', component: User },
  { path: '/category', name: 'Category Managemnt', component: Category },
  { path: '/challenge', name: 'Challenge Managemnt', component: Challenge },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
];

export default routes;
