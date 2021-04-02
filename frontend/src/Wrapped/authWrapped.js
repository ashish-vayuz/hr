import { Redirect } from "react-router-dom";
const AuthWrapped = ({ children, condition, path, loading }) => {
  return loading ? (
    <div>loading...</div>
  ) : condition ? (
    <>{children}</>
  ) : (
    <Redirect to={path} />
  );
};

export default AuthWrapped;
