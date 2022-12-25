import classes from "./auth-form.module.css";
import { useState } from "react";
import useRequest from "../../hooks/use-request";
import { useRouter } from "next/router";

const AuthForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignin, setIsSignin] = useState<boolean>(true);

  const switchAuthModeHandler = () => {
    setIsSignin((prevState) => !prevState);
  };

  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: isSignin ? "/api/users/signin" : "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => router.replace("/"),
  });

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Add validation

    await doRequest();

    // console.log(email, password);
  };

  return (
    <section className={classes.auth}>
      <h1>{isSignin ? "Signin" : "Signup"}</h1>

      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="On"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            required
            autoComplete="On"
          />
        </div>
        {errors}
        <div className={classes.actions}>
          <button>{isSignin ? "Signin" : "Signup"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isSignin ? "Create new account" : "Signin with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
