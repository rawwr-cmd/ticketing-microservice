import buildClient from "../helpers/build-client";

const homepage = ({ currentUser }: any | null) => {
  console.log(currentUser, "current user");
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

export const getServerSideProps = async (context: any) => {
  // console.log(req.headers);
  // requests should be made to http://ingress-nginx.ingress-nginx...laksdjfk
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  // console.log(data);
  return {
    props: data,
  };
};
export default homepage;
