import React, { useEffect } from "react";
import { HeadFC, navigate } from "gatsby";

import { useAppSelector } from "../app/store/hooks";
import Layout from "../components/Layout";

import * as styles from "./rooms.module.css";

const RoomsPage = () => {
  const username = useAppSelector((state) => state.user.name);
  const currentRoom = useAppSelector((state) => state.rooms.current);

  useEffect(() => {
    if (!username) {
      // Set username first
      navigate("/");
    }
  }, [username]);

  useEffect(() => {
    if (currentRoom) {
      navigate("/game");
    }
  }, [username, currentRoom]);

  return (
    <Layout title="Select a room">
      <div className={styles.wrapper}>
        <p>Welcome, {username}!</p>
        <p className={styles.instruction}>Please select a room</p>
      </div>
    </Layout>
  );
};

export default RoomsPage;

export const Head: HeadFC = () => <title>Choose room – Game of Three</title>;
