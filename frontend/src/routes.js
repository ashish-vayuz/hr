import React, { lazy } from "react";
const UserViewsManagement = lazy(() => import("./views/User/view"));
const ReviewView = lazy(() => import("./views/Reviewer/viewReviewer"));
const ReviewerManagement = React.lazy(() =>
  import("./views/Reviewer/ReviewerManagement")
);

const User = React.lazy(() => import("./views/User/UserManagement"));
const AddUser = React.lazy(() => import("./views/User/AddUser"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
//Category Routes
const Category = React.lazy(() => import("./views/Category/CategoryManagment"));
const CategoryAdd = React.lazy(() => import("./views/Category/CategoryAdd"));
const CategoryEdit = React.lazy(() => import("./views/Category/CategoryEdit"));
const CategoryView = React.lazy(() => import("./views/Category/CategroyView"));
//Challenge Routes
const Challenge = React.lazy(() =>
  import("./views/Challenge/ChallengeManagement")
);
const ChallengeAdd = React.lazy(() => import("./views/Challenge/ChallengeAdd"));
const ChallengeView = React.lazy(() =>
  import("./views/Challenge/ChallengeView")
);
//Admin
const Admin = React.lazy(() =>
  import("./views/AdminManagement/AdminManagement")
);
const AddAdmin = React.lazy(() => import("./views/AdminManagement/AddAdmin"));

//CMs
const Cms = React.lazy(() => import("./views/Cms/Cms"));
const Cmsform = React.lazy(() => import("./views/Cms/Cmsform"));

const routes = [
  { path: "/login", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/user", name: "User Management", component: User },
  {
    path: "/userview/view",
    name: "User Views",
    component: UserViewsManagement,
  },
  // /useredit/edit
  {
    path: "/useredit/edit",
    name: "User Edit",
    component: AddUser,
  },
  { path: "/adduser", name: "Add User", component: AddUser },
  { path: "/category", name: "Category Management", component: Category },
  {
    path: "/editCategory/:id",
    name: "Category Management",
    component: CategoryEdit,
  },
  { path: "/addcat", name: "Category Management", component: CategoryAdd },
  {
    path: "/viewCategory",
    name: "Category Management",
    component: CategoryView,
  },
  { path: "/challenge", name: "Challenge Management", component: Challenge },
  {
    path: "/addChallenge",
    name: "Challenge Management",
    component: ChallengeAdd,
  },
  {
    path: "/viewChallenge",
    name: "Challenge Management",
    component: ChallengeView,
  },
  { path: "/addadmin", name: "Add Admin", component: AddAdmin },
  { path: "/updateadmin", name: "Update Admin", component: AddAdmin },
  { path: "/admin", name: "Dashboard", component: Admin },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/cms", name: "cms", component: Cms },
  { path: "/cmsform/:id", name: "cms", component: Cmsform },
  {
    path: "/reviewer",
    name: "Reviewer Management",
    component: ReviewerManagement,
  },
  {
    path: "/review/viewReview",
    name: "View Review",
    component: ReviewView,
  },
  { path: "/", exact: true, name: "Home" },
];

export default routes;
