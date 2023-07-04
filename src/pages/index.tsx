import React, { ChangeEventHandler, FormEventHandler } from "react";
import { login } from "../app/apiClient";
import { navigate } from "gatsby";

import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { setUsername } from "../app/store/usernameSlice";
import Layout from "../components/Layout";

import * as styles from "./index.module.css";

const LoginPage = () => {
  const username = useAppSelector((state) => state.username.value);
  const dispatch = useAppDispatch();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setUsername(e.target.value));
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    login(username);
    navigate("/rooms");
  };

  return (
    <Layout title="Login">
      <div className={styles.wrapper}>
        <form onSubmit={onSubmit}>
          <label className={styles.label} htmlFor="username">Please enter your username:</label>
          <input
            id="username"
            className={styles.input}
            value={username}
            onChange={onChange}
            placeholder="Emilie"
          />
          <button className={styles.submitButton}>Login</button>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
