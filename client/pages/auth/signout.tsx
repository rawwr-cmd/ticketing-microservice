import { useEffect } from "react";
import useRequest from "../../hooks/use-request";
import { useRouter } from "next/router";

const Sigout = () => {
  const Router = useRouter();
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.replace("/"),
  });

  useEffect(() => {
    doRequest();
  }, [doRequest]);

  return <div>Signing you out...</div>;
};

export default Sigout;
