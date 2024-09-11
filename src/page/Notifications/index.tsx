"use client"

import Notification from "@/components/Notification";
import { useTypedSelector } from "@/hooks/selector.hook";
import styles from "@/page/Notifications/styles.module.scss";

const Notifications = () => {
  const user = useTypedSelector(selector => selector.userSlice.user)

  return (
    <div className={`${styles.notifications}`}>
      {user.notifications.map((notification, i) => (
        <Notification
          key={i}
          type={notification[0]}
          message={notification[1]}
          status={notification[2]}
        />
      ))}
      {user.notifications.length === 0 && <div className={styles.dont}><h1>Нет уведомлений</h1></div>}
    </div>
  );
};

export default Notifications;
