import React, { useEffect } from "react";
import { navigate } from "gatsby";

import { useAppSelector } from "../app/store/hooks";
import { joinRoom } from "../app/apiClient";
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
      joinRoom(username, currentRoom.name, currentRoom.type);
      navigate('/game')
    }
  }, [username, currentRoom])

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
