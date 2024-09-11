"use client"

import ChatComponent from "@/components/ChatComponent";
import { chats, users } from "@/config";
import { useTypedSelector } from "@/hooks/selector.hook";
import styles from "@/page/Chat/styles.module.scss"

const Chat = () => {
  const search = useTypedSelector(selector => selector.navigationSlice.search.chats)

  return <div className={styles.chat}>
    <ChatComponent lastMessage="Написать админам по любому вопросу" type="support" />
    {users.map((user, i) => (
      user.username.includes(search) || user.name.includes(search) ? <ChatComponent lastMessage="Сделка еще состоится? Или ты меня решил кинуть?" type="user" user={user} /> : ""
    ))}
  </div>
}

export default Chat;
