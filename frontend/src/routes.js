import React from 'react';

const User = React.lazy(() => import('./views/User/UserManagement'));
const AddUser = React.lazy(() => import('./views/User/AddUser'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
//Category Routes
const Category = React.lazy(() => import('./views/Category/CategoryManagment'))
const CategoryAdd = React.lazy(() => import('./views/Category/CategoryAdd'))
const CategoryView = React.lazy(() => import('./views/Category/CategroyView'))
//Challenge Routes
const Challenge = React.lazy(() => import('./views/Challenge/ChallengeManagement'))
const ChallengeAdd = React.lazy(() => import('./views/Challenge/ChallengeAdd'))
const ChallengeView = React.lazy(() => import('./views/Challenge/ChallengeView'))
//Admin
const Admin = React.lazy(()=>import('./views/AdminManagement/AdminManagement'));
const AddAdmin = React.lazy(()=>import('./views/AdminManagement/AddAdmin'))

//CMs
const Cms = React.lazy(() => import("./views/Cms/Cms"));
const Cmsform = React.lazy(() => import('./views/cmsform/Cmsform'));
const Cmsgetform = React.lazy(() => import('./views/cmsform/Cmsgetform'));

const routes = [
  { path: '/login', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/user', name: 'User Management', component: User },
  { path: '/adduser', name: 'Add User', component: AddUser },
  { path: '/category', name: 'Category Management', component: Category },
  { path: '/addcat', name: 'Category Management', component: CategoryAdd },
  { path: '/viewCategory', name: 'Category Management', component: CategoryView },
  { path: '/challenge', name: 'Challenge Management', component: Challenge },
  { path: '/addChallenge', name: 'Challenge Management', component: ChallengeAdd },
  { path: '/viewChallenge', name: 'Challenge Management', component: ChallengeView },
  { path: '/addadmin', name: 'Dashboard', component: AddAdmin },
  { path: '/admin', name: 'Dashboard', component: Admin },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/cms', exact: true, name: "cms", component: Cms },
  { path: '/cms/cmsform/:id', exact: true, name: "cms", component: Cmsform },
  { path: '/cms/cmsgetform/:id', exact: true, name: "cms", component: Cmsgetform },
  { path: '/', exact: true, name: 'Home' },
];

export default routes;
