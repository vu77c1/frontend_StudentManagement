import {Link, useRouteError} from "react-router-dom";
import {Button, Result} from "antd";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
        <Result
            status="403"
            title="Oops!"
            subTitle={error.message||error.statusText}
            extra={<Button type="primary">
              <Link to="/">Back Home</Link>
            </Button>}
        />);
}