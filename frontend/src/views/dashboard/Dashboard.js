import React, { lazy, useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { godView } from "src/actions/adminAction.js";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));

const Dashboard = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({});

  useEffect(() => {
    document.title = "Human Race | DashBoard";
    dispatch(godView()).then((data) => {
      setState(data);
    });
  }, [dispatch]);

  console.log(state);

  return <WidgetsDropdown state={state} />;
};

export default Dashboard;
