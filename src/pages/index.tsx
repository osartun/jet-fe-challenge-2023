import React, { ChangeEventHandler, FormEventHandler, useEffect } from "react";
import { HeadFC, navigate } from "gatsby";

import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import GameController from "../app/GameController";
import { setUsername } from "../app/store/userSlice";
import Layout from "../components/Layout";

import * as styles from "./index.module.css";

const LoginPage = () => {
  const isSocketConnected = useAppSelector((state) => state.online.isConnected);
  const username = useAppSelector((state) => state.user.name);
  const dispatch = useAppDispatch();

  useEffect(() => {
    GameController.init();
  }, []);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setUsername(e.target.value));
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!isSocketConnected) {
      alert(
        "It seems like the server is not connected yet. Please make sure the server is running and try again"
      );
      return;
    }
    GameController.login(username);
    navigate("/rooms");
  };

  return (
    <Layout title="Login" hideRooms>
      <div className={styles.wrapper}>
        <form onSubmit={onSubmit}>
          <label className={styles.label} htmlFor="username">
            Please enter your username:
          </label>
          <input
            id="username"
            className={styles.input}
            value={username}
            onChange={onChange}
            placeholder="Emilie"
          />
          <button className={styles.submitButton} disabled={!isSocketConnected}>
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;

export const Head: HeadFC = () => <title>Login – Game of Three</title>;
