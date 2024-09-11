"use client"

import IconCard from "@/components/IconCard";
import Message from "@/components/Message";
import { users } from "@/config";
import styles from "@/page/ChatDetail/styles.module.scss"
import Image from "next/image";
import { notFound } from "next/navigation";
import { FC, FormEvent, useState } from "react";

const ChatDetail: FC<{ id: string }> = ({ id }) => {
  if (id != "support" && !users.find(u => u.id === Number(id))) return notFound()
  const words = ["Когда можно посмотреть?", "Еще продаете?", "Позвоните?", "Торг уместен?", "Пришлете видео?"]
  const [value, setValue] = useState<string>("")
  const [isFilesMenu, setIsFilesMenu] = useState<boolean>(false)
  const [messages, setMessages] = useState<Array<{ message: string, type: "your" | "his", sended_time: string, readed_time: string }>>([
     { message: "Еще сдаете?", type: "your", sended_time: "10:55", readed_time: "11:36"},
     { message: "Да. Цена указанна в обьявлении", type: "his", sended_time: "10:55", readed_time: "11:36"},
     { message: "Отлично! Где можем встретится?", type: "your", sended_time: "10:55", readed_time: "11:36"},
     { message: "Давайте у метро на мухасрансовской в час?", type: "his", sended_time: "10:55", readed_time: "11:36"},
     { message: "Хорошо, удачи", type: "your", sended_time: "10:55", readed_time: "11:36" },
  ])

  const type = id === "support" ? "support" : "user"

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessages([...messages, { type: "your", message: value, sended_time: "10:55", readed_time: "11:36" }])

    setValue("")
  }

  return <div className={styles.chatDetail}>
    {messages.length === 0 && id != "support" && <h1 className={styles.noneMessages}>Чат пуст. Ну же. Сделайте первый шаг</h1>}
    {type === "support" && (
      <div className={styles.supportMessage}>
        <p>Мы на связи с 10:00 до 22:00, тебе ответят живые люди<br/><br/> Также нам можно написать в <a href="https://t.me/nordwibe_media">телеграм</a> или на почту <a href="mailto:help@nordwibe.com">help@nordwibe.com</a></p>
      </div>
    )}
    <div className={styles.messages}>
      {messages.map(message => <Message {...message} />)}
    </div>
    { /* type === "support" && !isFilesMenu && (
      <div className={styles.anxiety}>
        <h1>{"Срочное".toUpperCase()}</h1>
      </div>
    ) */}
    {type === "user" && !isFilesMenu && value.length === 0 && messages.length === 0 && (
      <div className={styles.buttons}>
        {words.map(word => <h4 onClick={() => setValue(word)}>{word}</h4>)}
      </div>
    )}
    {isFilesMenu ? (
      <>
        <div className={styles.filesMenu}>
          <div className={styles.input}>
            <input type="file" onChange={e => setIsFilesMenu(false)} />
            <IconCard icon="galery" label="Галерея" />
          </div>
          <div className={styles.input}>
            <input type="file" onChange={e => setIsFilesMenu(false)} />
            <IconCard icon="camera" label="Камера" />
          </div>
          <div className={styles.input}>
            <input type="file" onChange={e => setIsFilesMenu(false)} />
            <IconCard icon="document" label="Файл" />
          </div>
        </div>
      </>
    ) : (
      <form onSubmit={onSubmit}>
        <div className={styles.input}>
          <div className={`${styles.icon} ${styles.file}`} onClick={() => setIsFilesMenu(!isFilesMenu)}>
            <Image src={"/icons/file.svg"} alt="file" width={100} height={100} />
          </div>
          <input type="text" value={value} onChange={e => setValue(e.target.value)} />
          <div className={`${styles.icon} ${styles.send}`}>
            <button type="submit"><Image src={"/icons/send.svg"} alt="send" width={100} height={100} /></button>
          </div>
        </div>
      </form>
    )}
  </div>
}

export default ChatDetail;
