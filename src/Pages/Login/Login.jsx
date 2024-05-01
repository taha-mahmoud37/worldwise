import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Navbar from "../../Components/PageNav/Navbar";
import { useAuth } from "../../Context/FakeAuthContext";
import Buttons from "../../Components/Button/Buttons";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  function handelSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }
  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", {replace: true});
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <Navbar />
      <form className={styles.form} onSubmit={handelSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Buttons type={"primary"}>Login</Buttons>
        </div>
      </form>
    </main>
  );
}
