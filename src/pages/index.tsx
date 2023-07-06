import React, { ChangeEventHandler, FormEventHandler, useEffect } from "react";
import { connect, login } from "../app/apiClient";
import { HeadFC, navigate } from "gatsby";

import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { setUsername } from "../app/store/userSlice";
import Layout from "../components/Layout";

import * as styles from "./index.module.css";

const LoginPage = () => {
  const username = useAppSelector((state) => state.user.name);
  const dispatch = useAppDispatch();

  useEffect(() => {
    connect();
  }, [])

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setUsername(e.target.value));
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    login(username);
    navigate("/rooms");
  };

  return (
    <Layout title="Login" hideRooms>
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

export const Head: HeadFC = () => <title>Login – Game of Three</title>