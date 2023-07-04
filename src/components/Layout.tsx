import React, { FC, PropsWithChildren } from "react";

import footerImg from "../images/JET-Logo-White-Primary-Hor-RGB.png";

import Rooms from "./Rooms";
import * as styles from "./Layout.module.css";

interface Props {
  title: string;
  hideRooms?: boolean;
}

const Layout: FC<PropsWithChildren<Props>> = ({
  title,
  hideRooms,
  children,
}) => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>{title}</header>
      <main className={styles.main}>
        <aside className={styles.sidebar}>{hideRooms ? null : <Rooms />}</aside>
        <div className={styles.content}>{children}</div>
      </main>
      <footer className={styles.footer}>
        <img
          src={footerImg}
          alt="Just Eat Takeaway.com"
          className={styles.footerLogo}
        />
      </footer>
    </div>
  );
};

export default Layout;
