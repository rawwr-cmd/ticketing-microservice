import axios from "axios";

const buildClient = ({ req }: any) => {
  // we are on the server
  if (typeof window === "undefined") {
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // we must be on the browser
    return axios.create({
      baseURL: "/",
    });
  }
};
export default buildClient;
