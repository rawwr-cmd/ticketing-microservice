// import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import buildClient from "../helpers/build-client";
import type { AppProps } from "next/app";
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <h1>Header</h1>
      <Component {...pageProps} />
    </div>
  );
};

App.getInitialProps = async (appContext: any) => {
  // console.log(Object.keys(appContext));
  // console.log(appContext);
  const client = buildClient(appContext.ctx);
  console.log(client);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps?.(appContext.ctx);
  }
  console.log(pageProps);
  // console.log(data);

  return data;
};

export default App;
