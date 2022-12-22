import classes from "./auth-form.module.css";
import axios from "axios";
import { useState } from "react";
const AuthForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    // Add validation

    const response = await axios.post("/api/users/signup", {
      email,
      password,
    });

    console.log(response.data);

    console.log(email, password);
  };

  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>

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
        <div className={classes.actions}>
          <button>Submit</button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
