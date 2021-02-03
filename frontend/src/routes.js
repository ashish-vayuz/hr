import React from 'react';

const User = React.lazy(() => import('./views/User/UserManagement'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/user', name: 'User Management', component: User },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
];

export default routes;
