import React from "react";
import { useSelector } from "react-redux";
import AuthWrapped from "src/Wrapped/authWrapped";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
const TheLayout = () => {
  const { loading, userInfo, error } = useSelector((state) => state.userLogin);
  return (
    <AuthWrapped condition={userInfo} path="/" loading={loading}>
      <div className="c-app c-default-layout">
        <TheSidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <TheContent />
          </div>
          {/* <TheFooter /> */}
        </div>
      </div>
    </AuthWrapped>
  );
};

export default TheLayout;
