import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/auth.context";
import { Button, Result } from "antd";

const ProtectedRoute = (props) => {
  const { user } = useContext(AuthContext);
  const history = useNavigate();

  if (user && user.id) {
    return (
      <>
        {props.children}
      </>
    )
  }

  // return <Navigate to="/login" replace />;
  return(
    <Result
      status="403"
      title="Authorized"
      subTitle="You are much login!"
      extra={
        <Button
          type="primary"
          onClick={() => {
            history("/");
          }}
        >
          Back To Home
        </Button>
      }
    />
  )
};

export default ProtectedRoute;
