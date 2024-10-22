import { useNavigate, useRouteError } from "react-router-dom";
import { Button, Result } from "antd";

export default function ErrorPage() {
  const error = useRouteError();
  const history = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle={error.statusText || error.message}
      extra={
        <Button
          type="primary"
          onClick={() => {
            history("/");
          }}
        >
          Back Home
        </Button>
      }
    />
  );
}
